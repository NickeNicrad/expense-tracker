import { Schema, model, models } from 'mongoose'

const AccountTypeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
})

const AccountType = models.AccountType || model("AccountType", AccountTypeSchema)

export default AccountType