'use client'

import { useParams, useRouter } from "next/navigation"
import { useContext, useState, useEffect } from "react"
import { AlertContext } from "@/contexts/AlertProvider"

import Form from "@/components/forms/Form"
import InputForm from "@/components/forms/InputForm"
import SelectInput from "@/components/forms/SelectInput"

import categoryControllers from "@/controllers/category.controllers"
import subcategoryControllers from "@/controllers/subcategory.controllers"

function Create() {
    const router = useRouter()
    const params = useParams()
    const [category, setCategory] = useState(null)
    const [values, setValues] = useState({
        name: '',
        category: ''
    })

    const { alertHandler } = useContext(AlertContext)

    const handleChange = (input) => (e) => setValues(prev => ({...prev, [input]: e.target.value}))

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await subcategoryControllers.createSubCategory(values);

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

    const fetchCategory = async ({id}) => {
        const data = await categoryControllers.getCategoryById({id})

        setCategory(data)
    }

    useEffect(() => {
        if (params?.id) fetchCategory({id: params?.id})
    }, [params?.id])

    return (
        <div className="mt-8" style={{width: 450}}>
            <Form type={'Subcategory'} title={'Create a new subcategory'} handleSubmit={handleSubmit}>
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