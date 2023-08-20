'use client'

import { useEffect, useState } from "react"

import currencyControllers from "@/controllers/currency.controllers"
import CurrenciesList from "@/components/lists/CurrenciesList"

function Currencies () {
    const [currencies, setCurrencies] = useState([])

    const fetchCurrencies = async () => {
        const data = await currencyControllers.getCurrencies()

        setCurrencies(data)
    }

    useEffect(() => {
        fetchCurrencies()
    }, [])

    return (
        <section className='feed'>
            <CurrenciesList
                data={currencies}
            />
        </section>
    )
}

export default Currencies
