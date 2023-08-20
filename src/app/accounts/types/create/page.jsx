'use client'

import { useState, useContext } from "react"
import { useRouter } from "next/navigation"

import Form from "@/components/forms/Form"
import InputForm from "@/components/forms/InputForm"
import { AlertContext } from "@/contexts/AlertProvider"

import accountTypeControllers from "@/controllers/account.type.controllers"

function Create() {
    const router = useRouter()
    const { alertHandler } = useContext(AlertContext)
    const [name, setName] = useState('')

    const handleChange = (e) => setName(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await accountTypeControllers.createAccountType({ name });

        if (response?.ok && response?.status === 201) {
            router.replace('/accounts/types')
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
        <div className="mt-8" style={{width: 450}}>
            <Form type={'Account Type'} title={'Create a new account type'} handleSubmit={handleSubmit}>
                <InputForm
                    value={name}
                    type={'text'}
                    required={true}
                    placeholder={'Name'}
                    onChange={handleChange}
                />
                <button type="submit" className="black_btn w-full shadow-sm">
                    Save
                </button>
            </Form>
        </div>
    )
}

export default Create