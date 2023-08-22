import { connectToDB } from "@/utils/database";

import Record from "@/models/record";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        if (!params?.id)
            return new Response(JSON.stringify('Provide all information before to continue!'), {
                status: 201
            })

        const accountRecords = await Record.find({account: params?.id})
            .populate({path: 'category', select: 'name'})
            .populate({path: 'subcategory', select: 'name'})

        return new Response(JSON.stringify(accountRecords), {
            status: 200
        });
    } catch (error) {
        console.log(error);
        
        return new Response('Failed to fetch user accounts', {
            status: 500
        });
    }
}