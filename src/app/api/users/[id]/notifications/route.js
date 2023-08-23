import { connectToDB } from "@/utils/database";

import Notification from "@/models/notification";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        if (!params?.id)
            return new Response(JSON.stringify('Provide all information before to continue!'), {
                status: 400
            })

        const notifications = await Notification.find({owner: params?.id})
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