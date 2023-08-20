import { connectToDB } from "@/utils/database";

import Currency from "@/models/currency";

export const GET = async (request) => {
    try {
        await connectToDB();

        const currencies = await Currency.find().sort('name');

        return new Response(JSON.stringify(currencies), {
            status: 200
        });
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to fetch currencies', {
            status: 500
        });
    }
}