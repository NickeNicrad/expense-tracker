import { connectToDB } from "@/utils/database";

import Category from "@/models/category";
import SubCategory from "@/models/subcategory";

export const POST = async (request) => {
    const { name, category } = await request.json();

    try {
        if (!name || !category)
            return new Response(JSON.stringify('Provide the name before to continue!'), {
                status: 400
            })

        const categoryExist = await Category.findById(category)

        if (!categoryExist)
            return new Response(JSON.stringify('Category not found!'), {
                status: 400
            })

        await connectToDB();

        const newSubCategory = new SubCategory({
            name,
            category
        })

        const savedCategory = await newSubCategory.save()

        categoryExist.subcategories.push(newSubCategory)

        await categoryExist.save()

        return new Response(JSON.stringify(savedCategory), {
            status: 201
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response(JSON.stringify('Failed to create a new account'), {
            status: 500
        })
    }
}