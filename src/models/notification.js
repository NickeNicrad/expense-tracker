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
    },
})

const Balance = models.Balance || model("Balance", NotificationSchema)

export default Balance