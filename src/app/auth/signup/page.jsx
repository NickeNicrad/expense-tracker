'use client'

import { useRouter } from "next/navigation"
import { useCallback, useContext, useState } from "react"

import { AlertContext } from "@/contexts/AlertProvider"

import Form from "@/components/forms/Form"
import InputForm from "@/components/forms/InputForm"

function SignUp() {
    const router = useRouter()
    const { alertHandler } = useContext(AlertContext)
    const [credentials, setCredentials] = useState({
        email: '',
        username: '',
        password: '',
        confirmPass: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        if (!response.error && response.ok && response.status === 201) {
            router.replace('/auth/signin')
            alertHandler({
                type: 'success',
                visible: true,
                message: 'Successfully registered!',
            })
        } else {
            alertHandler({
                type: 'error',
                visible: true,
                message: `${response?.error}`,
            })
        }
    }

    const handeInputChange = useCallback((input) => (e) => {
        setCredentials(prev => ({...prev, [input]: e.target.value}))
    }, [credentials])

    return (
        <div className="mt-20" style={{width: 450}}>
            <Form type={'Sign Up'} title={'Create a new account'} handleSubmit={handleSubmit}>
                <InputForm
                    type={'text'}
                    required={true}
                    name={'username'}
                    placeholder={'Username'}
                    value={credentials.username}
                    onChange={handeInputChange('username')}
                />
                <InputForm
                    type={'email'}
                    name={'email'}
                    required={true}
                    value={credentials.email}
                    placeholder={'Email address'}
                    onChange={handeInputChange('email')}
                />
                <InputForm
                    required={true}
                    name={'password'}
                    type={'password'}
                    placeholder={'Password'}
                    value={credentials.password}
                    onChange={handeInputChange('password')}
                />
                <InputForm
                    required={true}
                    type={'password'}
                    name={'confirmPass'}
                    value={credentials.confirmPass}
                    placeholder={'Confirm password'}
                    onChange={handeInputChange('confirmPass')}
                />
                <button type="submit" className="black_btn w-full shadow-sm">
                    Sign in
                </button>
            </Form>
        </div>
    )
}

export default SignUp