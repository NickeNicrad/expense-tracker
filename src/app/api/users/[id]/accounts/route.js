import { connectToDB } from "@/utils/database";

import Account from "@/models/account";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        if (!params?.id)
            return new Response(JSON.stringify('Provide all information before to continue!'), {
                status: 400
            })

        const userAccounts = await Account.find({owner: params?.id})
            .populate('type')
            .populate('currency')
            .populate({
                path: 'owner',
                select: 'name image'
            })

        return new Response(JSON.stringify(userAccounts), {
            status: 200
        });
    } catch (error) {
        console.log(error);
        
        return new Response(JSON.stringify('Failed to fetch user accounts!'), {
            status: 500
        });
    }
}