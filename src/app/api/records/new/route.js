import { connectToDB } from "@/utils/database";

import Account from "@/models/account";
import Balance from "@/models/balance";

export const POST = async (request) => {
    const { owner, name, type, balance, currency } = await request.json();

    try {
        if (!owner || !name || !type || !balance || !currency)
            return new Response(JSON.stringify('Provide all information before to continue!'), {
                status: 201
            })

        await connectToDB()

        const newAccount = new Account({
            name,
            type,
            owner,
            currency,
        })

        const savedAccount = await newAccount.save()

        const newBalance = new Balance({
            amount: balance,
            account: newAccount?._id,
        })

        await newBalance.save()

        savedAccount.balances.push(newBalance)

        await savedAccount.save()

        return new Response(JSON.stringify(savedAccount), {
            status: 201
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to create a new account', {
            status: 500
        })
    }
}