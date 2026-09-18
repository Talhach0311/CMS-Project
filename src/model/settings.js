import mongoose from "mongoose";

const settingSchema = mongoose.Schema({
    website_name: {
        type: String,
        required: true
    },
    website_logo: {
        type: String,
        required: true
    },
    footer_description: {
        type: String,
        required: true
    }
})


const Setting = mongoose.model("Setting", settingSchema);

export default Setting;