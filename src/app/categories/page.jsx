'use client'

import { useEffect, useState } from "react"

import CategoriesList from "@/components/lists/CategoriesList"
import categoryControllers from "@/controllers/category.controllers"
import Breadcrumb from "@/components/Breadcrumb"

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
            <Breadcrumb />
            <CategoriesList
                data={categories}
            />
        </section>
    )
}

export default Currencies
