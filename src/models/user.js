import { Schema, model, models } from 'mongoose'

const defaultImage = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        unique: [true, 'Username already exists!'],
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Invalid username, it should contain 8-20 alpha-numeric letters and be unique!"]
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        // match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Invalid password, it should contain 8-20 alpha-numeric letters and be unique!"]
    },
    image: {
        type: String,
        default: defaultImage
    },
}, { timestamps: true })

const User = models.User || model("User", UserSchema)

export default User