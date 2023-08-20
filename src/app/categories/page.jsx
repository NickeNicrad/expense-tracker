'use client'

import { useEffect, useState } from "react"

import CategoriesList from "@/components/lists/CategoriesList"
import categoryControllers from "@/controllers/category.controllers"

function Currencies () {
    const [categories, setCategories] = useState([])

    const fetchCurrencies = async () => {
        const data = await categoryControllers.getCategories()

        setCategories(data)
    }

    useEffect(() => {
        fetchCurrencies()
    }, [])

    return (
        <section className='feed'>
            <CategoriesList
                data={categories}
            />
        </section>
    )
}

export default Currencies
