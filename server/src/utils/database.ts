import mongoose from "mongoose";
import logger from "./logger";

const DB_CONNECTION_STRING =
    process.env.DB_CONNECTION_STRING || "mongodb+srv://fatih:mPFTt7CozM4GsY33@cluster0.qyk07.mongodb.net/test?tls=true";

    export async function connectToDatabase() {
        try{
            await mongoose.connect(DB_CONNECTION_STRING);
            logger.info("Connect to database");
        } catch(e){
            logger.error(e, "Failing to connect to database");
            process.exit(1);
        }
    }

export async function disconnectFromDatabase() {
    await mongoose.connection.close();

    logger.info("Disconnected from database");

    return;
}