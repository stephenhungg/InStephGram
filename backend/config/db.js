import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // Use a default MongoDB URI if none is provided
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/instephgram';
        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.log('Continuing without database connection for development...');
        // Don't exit process in development, just log the error
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
}