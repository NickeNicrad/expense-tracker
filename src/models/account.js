import { Schema, model, models } from 'mongoose'

const AccountSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'AccountType'
    },
    currency: {
        type: Schema.Types.ObjectId,
        ref: 'Currency'
    },
    balances: [{ type: Schema.Types.ObjectId, ref: 'Balance' }]
})

const Account = models.Account || model("Account", AccountSchema)

export default Account