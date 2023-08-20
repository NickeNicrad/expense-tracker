import { connectToDB } from "@/utils/database";

import Category from "@/models/category";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const category = await Category.findById(params?.id)

        if (!category)
            return new Response('Category not found', {
                status: 404
            })

        return new Response(JSON.stringify(category), {
            status: 200
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to fetch category', {
            status: 500
        })
    }
}

export const PATCH = async (request, { params }) => {
    try {
        await connectToDB()

        const { owner, amount, category, account, subcategories } = await request.json();

        const accountExist = await Category.findById(params?.id);

        if (!accountExist)
            return new Response('Category not found', {
                status: 404
            });

        accountExist.owner = owner
        accountExist.amount = amount
        accountExist.account = account
        accountExist.category = category
        accountExist.subcategories = subcategories

        await accountExist.save();

        return new Response(JSON.stringify(accountExist), {
            status: 200
        });
    } catch (error) {
        console.log(error?.message);
        
        return new Response('Failed to update category', {
            status: 500
        });
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB()

        await Category.findByIdAndDelete(params?.id);

        return new Response('Category deleted', {
            status: 200
        });
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to delete category', {
            status: 500
        });
    }
}