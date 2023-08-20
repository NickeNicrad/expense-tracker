import { connectToDB } from "@/utils/database";

import Category from "@/models/category";

export const GET = async (request) => {
    try {
        await connectToDB()

        const categories = await Category.find().populate('subcategories')

        return new Response(JSON.stringify(categories), {
            status: 200
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to fetch categories', {
            status: 500
        })
    }
}