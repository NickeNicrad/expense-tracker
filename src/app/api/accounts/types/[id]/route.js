import { connectToDB } from "@/utils/database";

import AccountType from "@/models/accountType";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const accountType = await AccountType.findById(params?.id);

        if (!accountType)
            return new Response('AccountType not found!', {
                status: 404
            });

        return new Response(JSON.stringify(accountType), {
            status: 200
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to fetch account type!', {
            status: 500
        })
    }
}

export const PATCH = async (request, { params }) => {
    try {
        await connectToDB()

        const { name } = await request.json();

        const accountExist = await AccountType.findById(params?.id);

        if (!accountExist)
            return new Response('account type not found', {
                status: 404
            });

        accountExist.name = name

        await accountExist.save()

        return new Response(JSON.stringify(accountExist), {
            status: 200
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to update account type!', {
            status: 500
        })
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB()

        await AccountType.findByIdAndDelete(params?.id)

        return new Response('Account type deleted!', {
            status: 200
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to delete account type!', {
            status: 500
        })
    }
}