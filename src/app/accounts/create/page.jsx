"use client"

import { useEffect, useState, useContext } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { AlertContext } from "@/contexts/AlertProvider"

import Form from "@/components/forms/Form"
import InputForm from "@/components/forms/InputForm"
import SelectInput from "@/components/forms/SelectInput"

import accountControllers from "@/controllers/account.controllers"
import currencyControllers from "@/controllers/currency.controllers"
import accountTypeControllers from "@/controllers/account.type.controllers"
import Breadcrumb from "@/components/Breadcrumb"

function Create() {
    const router = useRouter()
    const { data: session } = useSession()
    const [values, setValues] = useState({
        name: '',
        type: '',
        balance: '',
        currency: '',
    })
    const [currencies, setCurrencies] = useState([])
    const [accountTypes, setAccountTypes] = useState([])
    const { alertHandler } = useContext(AlertContext)

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

        const response = await accountControllers.createAccount({
            type: values.type,
            name: values.name,
            balance: values.balance,
            owner: session?.user?.id,
            currency: values.currency
        })

        console.log(response)

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

    const fetchCurrencies = async () => {
        const data = await currencyControllers.getCurrencies()

        setCurrencies(data)
    }

    const fetchAccountTypes = async () => {
        const data = await accountTypeControllers.getAccountTypes()

        setAccountTypes(data)
    }

    useEffect(() => {
        fetchCurrencies()
        fetchAccountTypes()
    }, [])

    return (
        <div className="mt-8 feed">
            <Form type={'Account'} title={'Create a new account'} handleSubmit={handleSubmit}>
                <Breadcrumb />
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