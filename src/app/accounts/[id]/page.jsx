"use client"

import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState, useContext } from "react"
import { AlertContext } from "@/contexts/AlertProvider"

import Breadcrumb from "@/components/Breadcrumb"
import InputForm from "@/components/forms/InputForm"
import LineChart from "@/components/charts/LineChart"
import AccountHeader from "@/components/AccountHeader"
import SelectInput from "@/components/forms/SelectInput"
import RecordsList from "@/components/lists/RecordsList"

import { useCreateRecord } from "@/hooks/useRecordData"
import { useGetAccountById, useGetAccountRecords } from "@/hooks/useAccountData"
import { useGetCategories, useGetCategorySubcategories } from "@/hooks/useCategoryData"

function Account() {
    const params = useParams()
    const { data: session } = useSession()
    const [values, setValues] = useState({
        amount: '',
        category: '',
        subcategory: '',
    })

    const { alertHandler } = useContext(AlertContext)

    const { data: categories } = useGetCategories()
    const { data: account } = useGetAccountById({id: params?.id})
    const { data: accountRecords } = useGetAccountRecords({id: params?.id})
    const { mutateAsync: createRecord } = useCreateRecord({id: params?.id})
    const { data: subCategories } = useGetCategorySubcategories({id: values.category})

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

        const response = await createRecord({
            ...values,
            account: params?.id,
            owner: session?.user?.id,
        })

        if (response?.ok && response?.status === 201) {
            const data = await response.json()

            if (data?.notification)
                alert(data?.notification?.description)

            setValues({amount: '', category: '', subcategory: ''})
            alertHandler({ message: 'Success saved!', type: 'success', visible: true })
        } else {
            alertHandler({
                type: 'error',
                visible: true,
                message: `${response?.error}`,
            })
        }
    }

    return (
        <section className="w-full flex-center flex-col">
            <Breadcrumb />
            <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1 rounded-lg">
                    <AccountHeader account={account} />
                    <div className="glassmorphism">
                        <RecordsList data={accountRecords} />
                    </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <div className="glassmorphism my-4">
                        <div className="h-56">
                            <LineChart
                                title={`${account?.name} - Records history`}
                                labels={accountRecords?.length ? [...accountRecords?.map(item => formatDate(item?.createdAt))] : []}
                                datasets={[
                                    {
                                        label: account?.currency?.code,
                                        data: accountRecords?.length ? [...accountRecords?.map(item => item?.amount)] : [],
                                        borderColor: 'rgb(255, 99, 132)',
                                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                        borderWidth: 1
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className='w-full max-2xl flex flex-col gap-7 glassmorphism'
                    >
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
                    </form>
                </div>
            </div>
        </section>
    )
}

const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
        day: 'numeric',
        month: 'numeric',
    })
}

export default Account