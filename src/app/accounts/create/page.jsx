"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState, useContext } from "react"

import { AlertContext } from "@/contexts/AlertProvider"

import Form from "@/components/forms/Form"
import Breadcrumb from "@/components/Breadcrumb"
import InputForm from "@/components/forms/InputForm"
import SelectInput from "@/components/forms/SelectInput"

import { useCreateAccount } from "@/hooks/useAccountData"
import { useGetCurrencies } from "@/hooks/useCurrencyData"
import { useGetAccountTypes } from "@/hooks/useAccountTypeData"

function Create() {
    const router = useRouter()
    const { data: session } = useSession()
    const [values, setValues] = useState({
        name: '',
        type: '',
        limit: '',
        balance: '',
        currency: '',
    })

    const { alertHandler } = useContext(AlertContext)

    const { data: currencies } = useGetCurrencies()
    const { data: accountTypes } = useGetAccountTypes()
    const { mutateAsync: createAccount } = useCreateAccount({id: session?.user?.id})

    const handleChange = (input) =>  (e) => {
        setValues(prev => ({...prev, [input]: e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { name, type, balance, currency } = values

        if (!balance || !name || !type || !currency || !session?.user?.id)
            return alertHandler({
                type: 'error',
                visible: true,
                message: 'Fill all fields before to continue',
            })

        const response = await createAccount({
            ...values,
            owner: session?.user?.id
        })

        if (response?.ok && response?.status === 201) {
            router.replace('/')
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
        <div className="feed">
            {/* <Breadcrumb /> */}
            <Form type={'Account'} title={'Create a new account'} handleSubmit={handleSubmit}>
                <InputForm
                    type={'text'}
                    required={true}
                    value={values.name}
                    placeholder={'Name'}
                    onChange={handleChange('name')}
                />
                <InputForm
                    type={'number'}
                    required={true}
                    value={values.balance}
                    placeholder={'Balance'}
                    onChange={handleChange('balance')}
                />
                <InputForm
                    type={'number'}
                    required={true}
                    value={values.limit}
                    placeholder={'Limit'}
                    onChange={handleChange('limit')}
                />
                <SelectInput
                    data={currencies}
                    name={'currency'}
                    value={values.currency}
                    onChange={handleChange('currency')}
                    placeholder={'Select your currency'}
                />
                <SelectInput
                    name={'type'}
                    data={accountTypes}
                    value={values.type}
                    onChange={handleChange('type')}
                    placeholder={'Select your type'}
                />
                <button type="submit" className="black_btn w-full shadow-sm">
                    Save
                </button>
            </Form>
        </div>
    )
}

export default Create