import { connectToDB } from "@/utils/database";

import Account from "@/models/account";

export const GET = async (request) => {
    try {
        await connectToDB()

        const accounts = await Account.find()
            .populate('type')
            .populate('currency')
            .populate({
                path: 'owner',
                select: 'name image'
            })

        return new Response(JSON.stringify(accounts), {
            status: 200
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to fetch accounts', {
            status: 500
        })
    }
}