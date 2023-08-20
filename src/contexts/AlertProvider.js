'use client'

import { createContext, useState, useEffect } from "react";

export const AlertContext = createContext();

const AlertProvider = ({ children }) => {
    const [type, setType] = useState('')
    const [message, setMessage] = useState('')
    const [visible, setVisible] = useState(false)

    const reset = () => {
        setType('')
        setMessage('')
        setVisible(false)
    }

    const alertHandler = ({ type, message, visible }) => {
        setType(type)
        setMessage(message)
        setVisible(visible)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            reset()
        }, 3000)

        return () => {
            clearTimeout(timer)
        }
    }, [visible])

    return (
        <AlertContext.Provider value={{
            type,
            message,
            visible,
            alertHandler
        }}>
            {children}
        </AlertContext.Provider>
    )
}

export default AlertProvider