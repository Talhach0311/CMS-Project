import mongoose from "mongoose"
import slugify from "slugify"

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        trim: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create a pre-save hook to generate the slug before saving the category
categorySchema.pre('save', async function(next) {
    this.slug = await slugify(this.name, {lower: true, strict: true});
})

const Category = mongoose.model("Category", categorySchema);

export default Category;

