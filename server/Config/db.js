import mongoose from "mongoose";
export const connectDB= async()=> {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Successfully Connected to Database👍");
        
    } catch (error) {
        console.log(`Error ${error.message}`);
        // process.exit(1)
    }
}
