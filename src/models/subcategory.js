import { Schema, model, models } from 'mongoose'

const SubCategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
})

const SubCategory = models.SubCategory || model("SubCategory", SubCategorySchema)

export default SubCategory