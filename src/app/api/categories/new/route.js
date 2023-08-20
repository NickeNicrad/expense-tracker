import { connectToDB } from "@/utils/database";

import Category from "@/models/category";

export const POST = async (request) => {
    const { name } = await request.json();

    try {
        if (!name)
            return new Response(JSON.stringify('Provide the name before to continue!'), {
                status: 400
            })

        await connectToDB()

        const newCategory = new Category({
            name
        })

        await newCategory.save()

        return new Response(JSON.stringify(newCategory), {
            status: 201
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to create a new account', {
            status: 500
        })
    }
}