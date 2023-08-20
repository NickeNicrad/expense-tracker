import { connectToDB } from "@/utils/database";

import Balance from "@/models/balance";

export const GET = async (request) => {
    try {
        await connectToDB();

        const balances = await Balance.find();

        return new Response(JSON.stringify(balances), {
            status: 200
        });
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to fetch balances', {
            status: 500
        });
    }
}