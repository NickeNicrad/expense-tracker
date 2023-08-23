import { connectToDB } from "@/utils/database";

import Record from "@/models/record";
import Account from "@/models/account";
import Balance from "@/models/balance";
import Notification from "@/models/notification";

export const POST = async (request) => {
    const { owner, amount, account, category, subcategory } = await request.json();

    try {
        if (!owner || !amount || !account || !category || !subcategory)
            return new Response(JSON.stringify('Provide all information before to continue!'), {
                status: 400
            })

        await connectToDB()

        const savedAccount = await Account.findByIdAndUpdate(account, { $inc: { balance: amount } }, { new: true })
            .populate('type')
            .populate({
                path: 'balances'
            });

        if (!savedAccount)
            return new NextResponse(JSON.stringify('Account not found!'), {
                status: 400
            });

        if (parseFloat(savedAccount?.balance || 0) < parseFloat(amount))
            return new NextResponse(JSON.stringify("You don't have enough money to complete this operation!"), {
                status: 400
            });

        const newRecord = new Record({
            owner,
            amount,
            account,
            category,
            subcategory,
        })
            
        const balanceAmount = parseFloat(savedAccount?.balance || 0) + parseFloat(amount)

        const newBalance = new Balance({
            account,
            amount: balanceAmount,
        })

        await newBalance.save()

        savedAccount.balances.push(newBalance)

        await savedAccount.save()

        const savedRecord = await newRecord.save()

        const notification = await checkLimitExceeds({
            owner,
            account: savedAccount,
            amount: amount < 0 ? Math.abs(amount) : 0,
            limit: parseFloat(savedAccount?.limit || 0)
        })

        return new Response(JSON.stringify({record: savedRecord, notification}), {
            status: 201
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response(JSON.stringify('Failed to create a new account!'), {
            status: 500
        })
    }
}

const checkLimitExceeds = async ({ limit, amount, owner, account }) => {
    if (limit > 0 && limit < amount) {
        const newNotification = new Notification({
            owner,
            title: 'Balance limit exceeded',
            description: `Dear customer, the limit to your ${account?.name} ${account?.type?.name} account has exceeded.`,
        })

        return await newNotification.save()
    }
}