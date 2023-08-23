import { connectToDB } from "@/utils/database";

import AccountType from "@/models/accountType";

export const GET = async (request) => {
    try {
        await connectToDB();

        const accountTypes = await AccountType.find();

        return new Response(JSON.stringify(accountTypes), {
            status: 200
        });
    } catch (error) {
        console.log(error?.message);
        
        return new Response(JSON.stringify('Failed to fetch account types'), {
            status: 500
        });
    }
}