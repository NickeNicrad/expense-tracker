import { Schema, model, models } from 'mongoose'

const BalanceSchema = new Schema({
    amount: {
        type: Number,
        required: [true, 'Amount is required!'],
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }
}, { timestamps: true })

const Balance = models.Balance || model("Balance", BalanceSchema)

export default Balance