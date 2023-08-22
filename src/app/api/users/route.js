import { connectToDB } from "@/utils/database";

import User from "@/models/user";
import { models } from "mongoose";

export const GET = async (request) => {
    try {
        await connectToDB()

        const users = await User.find()

        console.log('models', models)

        return new Response(JSON.stringify(users), {
            status: 200
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to fetch user posts', {
            status: 500
        })
    }
}