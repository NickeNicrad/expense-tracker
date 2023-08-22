'use client'

import { useRouter } from "next/navigation"
import { useContext, useState } from "react"

import Form from "@/components/forms/Form"
import InputForm from "@/components/forms/InputForm"

import currencyControllers from "@/controllers/currency.controllers"
import { AlertContext } from "@/contexts/AlertProvider"

function Create() {
    const router = useRouter()
    const { alertHandler } = useContext(AlertContext)
    const [values, setValues] = useState({
        code: '',
        name: ''
    })

    const handleChange = (input) => (e) => setValues(prev => ({...prev, [input]: e.target.value}))

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await currencyControllers.createCurrency(values);

        if (!response?.error && response?.ok && response?.status === 201) {
            router.replace('/currencies')
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
        <div className="mt-8 feed">
            <Form type={'Currency'} title={'Create a new currency'} handleSubmit={handleSubmit}>
                <InputForm
                    type={'text'}
                    required={true}
                    value={values.code}
                    placeholder={'Code'}
                    onChange={handleChange('code')}
                />
                <InputForm
                    type={'text'}
                    required={true}
                    value={values.name}
                    placeholder={'Name'}
                    onChange={handleChange('name')}
                />
                <button type="submit" className="black_btn w-full shadow-sm">
                    Save
                </button>
            </Form>
        </div>
    )
}

export default Create