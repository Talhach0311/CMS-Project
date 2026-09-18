import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
        required: true
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "News",
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Comments = mongoose.model("Comments", commentSchema);

export default Comments;