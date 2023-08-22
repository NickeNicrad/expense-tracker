"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect, useState, useContext } from "react"
import { AlertContext } from "@/contexts/AlertProvider"

import Form from "@/components/forms/Form"
import Breadcrumb from "@/components/Breadcrumb"
import InputForm from "@/components/forms/InputForm"
import SelectInput from "@/components/forms/SelectInput"
import RecordsList from "@/components/lists/RecordsList"

import recordControllers from "@/controllers/record.controllers"
import accountControllers from "@/controllers/account.controllers"
import categoryControllers from "@/controllers/category.controllers"

function Account() {
    const params = useParams()
    const { data: session } = useSession()
    const [values, setValues] = useState({
        amount: '',
        category: '',
        subcategory: '',
    })
    const [account, setAccount] = useState(null)
    const [accountRecords, setAccountRecords] = useState([])
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])

    const { alertHandler } = useContext(AlertContext)

    const handleChange = (input) =>  (e) => {
        setValues(prev => ({...prev, [input]: e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { amount, category, subcategory } = values

        if (!category || !params?.id || !amount || !subcategory || !session?.user?.id)
            return alertHandler({
                type: 'error',
                visible: true,
                message: 'Fill all fields before to continue',
            })

        const response = await recordControllers.createRecord({
            account: params?.id,
            amount: values.amount,
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

    const fetchAccountById = async (id) => {
        const data = await accountControllers.getAccountById({id})

        setAccount(data)
    }

    const fetchAccountRecords = async (id) => {
        const data = await accountControllers.getAccountRecords({id})

        setAccountRecords(data)
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
        if (params?.id) {
            fetchCategories()
            fetchAccountById(params?.id)
            fetchAccountRecords(params?.id)
        }
    }, [])

    useEffect(() => {
        if (values.category) {
            fetchSubCategories(values.category)
        }
    }, [values.category])

    return (
        <section className="w-full flex-center flex-col">
            <Breadcrumb />
            <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1 rounded-lg">
                    <div className="rounded-md p-4">
                        <div className="flex justify-between">
                            <div className="text-center sm:text-left">
                                <h3 className="text-xl font-bold text-gray-600">
                                    {account?.name}
                                </h3>
                            </div>
                            <Link
                                href={`/accounts/${params?.id}/update`}
                                className="block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
                            >
                                <span className="sr-only">Edit</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </Link>
                        </div>
                        <p className="text-lg text-gray-500 semibold">
                            {account?.type?.name}
                        </p>
                        <p className="line-clamp-3 text-2xl/relaxed font-medium text-gray-600">
                            {account?.balance ? Number(account?.balance).toFixed(2) : 0} <span className="text-sm">{account?.currency?.code}</span>
                        </p>
                    </div>
                    <RecordsList data={accountRecords} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <Form type={'Record'} title={'Create a new record'} handleSubmit={handleSubmit}>
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
            </div>
        </section>
    )
}

export default Account