import { connectToDB } from "@/utils/database";

import SubCategory from "@/models/subcategory";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        if (!params?.id)
            return new Response(JSON.stringify('Provide category id before to continue!'), {
                status: 201
            });

        const subcategories = await SubCategory.find({category: params?.id})

        return new Response(JSON.stringify(subcategories), {
            status: 200
        });
    } catch (error) {
        console.log(error);
        
        return new Response(JSON.stringify('Failed to fetch subcategories'), {
            status: 500
        });
    }
}