import mongoose from "mongoose";

import User from "@/models/user";
import Record from "@/models/record";
import Account from "@/models/account";
import Balance from "@/models/balance";
import Category from "@/models/category";
import Currency from "@/models/currency";
import AccountType from "@/models/accountType";
import SubCategory from "@/models/subcategory";
import Notification from "@/models/notification";


let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('MongoBD is already connected')
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            dbName: 'expense-tracker',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true

        console.log('MongoDB connected')
    } catch (error) {
        console.log('something went wrong', error?.message)
    }
}