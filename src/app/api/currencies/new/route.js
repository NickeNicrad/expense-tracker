import { NextResponse } from "next/server";

import { connectToDB } from "@/utils/database";

import Currency from "@/models/currency";

export const POST = async (request) => {
    const { code, name } = await request.json();

    try {
        if (code === '' || name === '')
            return new NextResponse(JSON.stringify('Provide currency name & name before to continue!'), {
                status: 400
            });

        await connectToDB();

        const newCurrency = new Currency({
            code: code?.toUpperCase(),
            name
        });

        await newCurrency.save();

        return new NextResponse(JSON.stringify(newCurrency), {
            status: 201
        });
    } catch (error) {
        console.log(error?.message);
        
        return new NextResponse(JSON.stringify('Failed to create a new currency!'), {
            status: 500
        });
    }
}