'use client'

import { signIn }  from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useState, useContext } from "react"

import { AlertContext } from "@/contexts/AlertProvider"

import Form from "@/components/forms/Form"
import InputForm from "@/components/forms/InputForm"

function SignIn() {
    const router = useRouter()
    const { alertHandler } = useContext(AlertContext)
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {email, password} = credentials

        const response = await signIn('authCredentials', {
            email,
            password,
            redirect: false,
            callbackUrl: `${window.location.origin}`
        })

        if (!response.error && response.ok && response.status === 200) {
            router.replace('/')
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
            <Form type={'Sign In'} title={'Sign in to your account'} handleSubmit={handleSubmit}>
                <InputForm
                    type={'email'}
                    required={true}
                    value={credentials.email}
                    placeholder={'Email address'}
                    onChange={handeInputChange('email')}
                />
                <InputForm
                    required={true}
                    type={'password'}
                    placeholder={'Password'}
                    value={credentials.password}
                    onChange={handeInputChange('password')}
                />
                <button type="submit" className="black_btn w-full shadow-sm">
                    Sign in
                </button>
            </Form>
        </div>
    )
}

export default SignIn