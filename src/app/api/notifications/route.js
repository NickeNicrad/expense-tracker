import { connectToDB } from "@/utils/database";

import Notification from "@/models/notification";

export const GET = async (request) => {
    try {
        await connectToDB()

        const notifications = await Notification.find()
            .populate({
                path: 'owner',
                select: 'name image'
            })

        return new Response(JSON.stringify(notifications), {
            status: 200
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response(JSON.stringify('Failed to fetch notifications!'), {
            status: 500
        })
    }
}