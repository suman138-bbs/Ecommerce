import mongoose from "mongoose";

const { Schema } = mongoose;

const collectionSchema = new Schema(
    {
        name: {
            type: String,
            required: ["true", "please provide a collection name"],
            tirm: true,
            maxlength: [120, "collection name should not be more than 120 chars"]
        }
        
    
    },
    { timestamps: true }
);

export default mongoose.model("Collection", collectionSchema)


// collections