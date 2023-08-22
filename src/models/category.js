import { Schema, model, models } from 'mongoose'

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    subcategories: [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }],
}, { timestamps: true })

const Category = models.Category || model("Category", CategorySchema)

export default Category