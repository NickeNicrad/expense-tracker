import { Schema, model, models } from 'mongoose'

const NotificationSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
    },
    description: {
        type: String,
        required: [true, 'description is required!'],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Notification = models.Notification || model("Notification", NotificationSchema)

export default Notification