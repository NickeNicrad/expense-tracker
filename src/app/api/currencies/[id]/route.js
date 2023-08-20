import { connectToDB } from "@/utils/database";

import Currency from "@/models/currency";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const currency = await Currency.findById(params?.id);

        if (!currency)
            return new Response('Currency not found', {
                status: 404
            });

        return new Response(JSON.stringify(currency), {
            status: 200
        });
    } catch (error) {
        console.log(error?.message);
        
        return new Response('Failed to fetch currency', {
            status: 500
        });
    }
}

export const PATCH = async (request, { params }) => {
    try {
        await connectToDB();

        const { name } = await request.json();

        const currencyExist = await Currency.findById(params?.id);

        if (!currencyExist)
            return new Response('Currency not found', {
                status: 404
            });

        currencyExist.name = name;

        await currencyExist.save();

        return new Response(JSON.stringify(currencyExist), {
            status: 200
        });
    } catch (error) {
        console.log(error?.message);
        
        return new Response('Failed to update currency', {
            status: 500
        });
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Currency.findByIdAndDelete(params?.id);

        return new Response('Currency deleted', {
            status: 200
        });
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to delete currency', {
            status: 500
        });
    }
}