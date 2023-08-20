"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect, useState, useContext } from "react"
import { AlertContext } from "@/contexts/AlertProvider"

import Form from "@/components/forms/Form"
import InputForm from "@/components/forms/InputForm"
import SelectInput from "@/components/forms/SelectInput"

import userControllers from "@/controllers/user.controllers"
import recordControllers from "@/controllers/record.controllers"
import categoryControllers from "@/controllers/category.controllers"
import accountControllers from "@/controllers/account.controllers"

function Create() {
    const router = useRouter()
    const { data: session } = useSession()
    const [values, setValues] = useState({
        amount: '',
        account: '',
        category: '',
        subcategory: '',
    })
    const [account, setAccount] = useState(null)
    const [accounts, setAccounts] = useState([])
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])

    const { alertHandler } = useContext(AlertContext)

    const handleChange = (input) =>  (e) => {
        setValues(prev => ({...prev, [input]: e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { account, amount, category, subcategory } = values

        if (!category || !account || !amount || !subcategory || !session?.user?.id)
            return alertHandler({
                type: 'error',
                visible: true,
                message: 'Fill all fields before to continue',
            })

        const response = await recordControllers.createRecord({
            amount: values.amount,
            account: values.account,
            owner: session?.user?.id,
            category: values.category,
            subcategory: values.subcategory
        })

        if (response?.ok && response?.status === 201) {
            // router.replace('/')
            alertHandler({ message: 'Success saved!', type: 'success', visible: true })
        } else {
            alertHandler({
                type: 'error',
                visible: true,
                message: `${response?.error}`,
            })
        }

    }

    const fetchAccounts = async (id) => {
        const data = await userControllers.getUserAccounts({ id })

        setAccounts(data)
    }

    const fetchAccountById = async (id) => {
        const data = await accountControllers.getAccountById({id})

        setAccount(data)
    }

    const fetchCategories = async () => {
        const data = await categoryControllers.getCategories()

        setCategories(data)
    }

    const fetchSubCategories = async (id) => {
        const data = await categoryControllers.getCategorySubCategories({id})

        setSubCategories(data)
    }

    useEffect(() => {
        fetchCategories()
        if (session?.user?.id) fetchAccounts(session?.user?.id)
    }, [session?.user?.id])

    useEffect(() => {
        if (values.category) {
            fetchSubCategories(values.category)
        }
    }, [values.category])

    useEffect(() => {
        if (values.account) {
            fetchAccountById(values.account)
        }
    }, [values.account])

    return (
        <div className="mt-8" style={{width: 450}}>
            <Form type={'Record'} title={'Create a new record'} handleSubmit={handleSubmit}>
                <SelectInput
                    data={accounts}
                    name={'account'}
                    value={values.account}
                    onChange={handleChange('account')}
                    placeholder={'Select your account'}
                />

                <div className="rounded-md bg-white p-3">
                    <p className="line-clamp-3 font-semibold text-md/relaxed text-gray-500">
                        Balance
                    </p>
                    <p className="line-clamp-3 text-sm/relaxed text-gray-500">
                        {account?.balances?.amount || 0} {account?.currency?.code}
                    </p>
                </div>

                <div className="grid grid-cols-1 grid-cols-2 rounded-md bg-white">
                    <div
                        className="col-span-1 p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                    >
                        <p className="line-clamp-3 font-semibold text-md/relaxed text-gray-500">
                            INCOME
                        </p>
                        <p className="line-clamp-3 text-sm/relaxed text-green-500">
                            {values.amount > 0 ? values.amount : 0 }
                        </p>
                    </div>

                    <div
                        className="col-span-1 p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                    >
                        <p className="line-clamp-3 font-semibold text-md/relaxed text-gray-500">
                            EXPENSE
                        </p>
                        <p className="line-clamp-3 text-sm/relaxed text-red-500">
                            {values.amount < 0 ? values.amount : 0 }
                        </p>
                    </div>
                </div>

                <InputForm
                    type={'number'}
                    required={true}
                    value={values.amount}
                    placeholder={'Amount'}
                    onChange={handleChange('amount')}
                />
                <SelectInput
                    data={categories}
                    name={'category'}
                    value={values.category}
                    onChange={handleChange('category')}
                    placeholder={'Select your category'}
                />
                <SelectInput
                    name={'subcategory'}
                    data={subCategories}
                    value={values.subcategory}
                    onChange={handleChange('subcategory')}
                    placeholder={'Select your subcategory'}
                />
                <button type="submit" className="black_btn w-full shadow-sm">
                    Save
                </button>
            </Form>
        </div>
    )
}

export default Create