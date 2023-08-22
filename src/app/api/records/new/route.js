import { connectToDB } from "@/utils/database";

import Record from "@/models/record";
import Account from "@/models/account";
import Balance from "@/models/balance";

export const POST = async (request) => {
    const { owner, amount, account, category, subcategory } = await request.json();

    console.log(owner, amount, account, category, subcategory)

    try {
        if (!owner || !amount || !account || !category || !subcategory)
            return new Response(JSON.stringify('Provide all information before to continue!'), {
                status: 400
            })

        await connectToDB()

        const newRecord = new Record({
            owner,
            amount,
            account,
            category,
            subcategory,
        })

        const savedAccount = await Account.findByIdAndUpdate(account, { $inc: { balance: amount } }, { new: true })
            .populate({
                path: 'balances'
            });
            
        const balanceAmount = parseFloat(savedAccount?.balance || 0) + parseFloat(amount)

        const newBalance = new Balance({
            account,
            amount: balanceAmount,
        })

        await newBalance.save()

        savedAccount.balances.push(newBalance)

        await savedAccount.save()

        const savedRecord = await newRecord.save()

        return new Response(JSON.stringify(savedRecord), {
            status: 201
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to create a new account', {
            status: 500
        })
    }
}