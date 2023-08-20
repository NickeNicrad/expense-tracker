'use client'

import { useContext } from "react"

import { AlertContext }  from '@/contexts/AlertProvider'

const AlertCard = () => {
    const { type, message, visible, alertHandler } = useContext(AlertContext)

    const handleClose = () => {
        alertHandler({
            type: '',
            message: '',
            visible: false,
        })
    }

    if (!visible)
        return null

    return (
        <div
            role="alert"
            className="absolute rounded-xl border border-gray-100 bg-white p-4 shadow-xl z-9"
        >
            <div className="flex items-start gap-4">
                <span className={type && type === 'success' ? "text-green-600" : "text-red-800"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </span>

                <div className="flex-1">
                    <strong className="block font-medium text-gray-900 capitalize">
                        {type && type}
                    </strong>

                    <p className="mt-1 text-sm text-gray-700">
                        {message && message}
                    </p>
                </div>

                <button className="text-gray-500 transition hover:text-gray-600" onClick={handleClose}>
                    <span className="sr-only">Dismiss popup</span>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default AlertCard