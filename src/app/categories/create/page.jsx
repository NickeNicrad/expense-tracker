'use client'

import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { AlertContext } from "@/contexts/AlertProvider"

import Form from "@/components/forms/Form"
import InputForm from "@/components/forms/InputForm"

import categoryControllers from "@/controllers/category.controllers"

function Create() {
    const router = useRouter()
    const { alertHandler } = useContext(AlertContext)
    const [values, setValues] = useState({
        name: ''
    })

    const handleChange = (input) => (e) => setValues(prev => ({...prev, [input]: e.target.value}))

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await categoryControllers.createCategory(values);

        console.log(response)

        if (!response?.error && response?.ok && response?.status === 201) {
            router.replace('/categories')
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
            <Form type={'Category'} title={'Create a new category'} handleSubmit={handleSubmit}>
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