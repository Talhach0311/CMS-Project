import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import paginate  from "mongoose-paginate-v2"

const UserSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true,
        trim: true
     },
     email: {
        type: String,
        required: true,
        unique: true,
        trim: true
     },
     password: {
        type: String,
        required: true,
        trim: true
     },
     role: {
        type: String,
        enum: ["author", "admin"],
        default: "author",
     }

}, {timestamps: true})

// pre save hook to hash the password before saving the user
UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
})

UserSchema.plugin(paginate)

const User = mongoose.model("User", UserSchema)

export default User;