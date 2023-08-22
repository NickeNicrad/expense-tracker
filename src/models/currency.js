import { Schema, model, models } from 'mongoose'

const CurrencySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    code: {
        type: String,
        required: [true, 'Code is required!'],
    },
}, { timestamps: true })

const Currency = models.Currency || model("Currency", CurrencySchema)

export default Currency