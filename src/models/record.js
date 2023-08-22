import { Schema, model, models } from 'mongoose'

const RecordSchema = new Schema({
    amount: {
        type: Number,
        required: [true, 'Amount is required!'],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategory: {
        type: Schema.Types.ObjectId,
        ref: 'SubCategory'
    },
}, { timestamps: true })

const Record = models.Record || model("Record", RecordSchema)

export default Record