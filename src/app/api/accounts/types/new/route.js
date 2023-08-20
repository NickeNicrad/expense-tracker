import { connectToDB } from "@/utils/database";

import AccountType from "@/models/accountType";

export const POST = async (request) => {
    const { name } = await request.json();

    try {
        await connectToDB()

        const newAccountType = new AccountType({
            name,
        });

        await newAccountType.save();

        return new Response(JSON.stringify(newAccountType), {
            status: 201
        });
    } catch (error) {
        console.log(error?.message);
        
        return new Response('Failed to create a new account type', {
            status: 500
        });
    }
}