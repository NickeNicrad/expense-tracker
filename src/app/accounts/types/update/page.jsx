'use client'

import { useState } from "react"

import Form from "@/components/forms/Form"
import InputForm from "@/components/forms/InputForm"

function Update() {
    const [name, setName] = useState('')

    const handleChange = (e) => setName(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()
        
        console.log(name)
    }

    return (
        <div className="mt-28" style={{width: 450}}>
            <Form type={'Account Type'} title={'Edit account type'} handleSubmit={handleSubmit}>
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

export default Update