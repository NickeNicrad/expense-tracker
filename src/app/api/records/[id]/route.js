import { connectToDB } from "@/utils/database";

import Account from "@/models/account";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const account = await Account.findById(params?.id)
            .populate('type')
            .populate('owner')
            .populate('balances')
            .populate('currency')

        if (!account)
            return new Response('Account not found', {
                status: 404
            })

        const balance = await Balance.findOne({ account: account?._id })
            .sort('-timestamp')
            .select('amount timestamp')
        
        if (balance) 
            account.balance = balance
        else
            account.balance = { amount: 0 }

        return new Response(JSON.stringify(account), {
            status: 200
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to fetch account', {
            status: 500
        })
    }
}

export const PATCH = async (request, { params }) => {
    try {
        await connectToDB()

        const { owner, name, type, balance, currency } = await request.json();

        const accountExist = await Account.findById(params?.id)
            .populate('type')
            .populate('owner')
            .populate('currency')

        if (!accountExist)
            return new Response('Account not found', {
                status: 404
            })

        accountExist.name = name
        accountExist.type = type
        accountExist.owner = owner
        accountExist.balance = balance
        accountExist.currency = currency

        await accountExist.save()

        return new Response(JSON.stringify(accountExist), {
            status: 200
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to update account', {
            status: 500
        })
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB()

        await Account.findByIdAndDelete(params?.id)

        return new Response('Account deleted', {
            status: 200
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to delete account', {
            status: 500
        })
    }
}