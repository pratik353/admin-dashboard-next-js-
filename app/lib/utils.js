import mongoose from "mongoose"

const DB_URL = process.env.DB_URL

export const connectToDB = async() => {
    const connection = {};
    try {
        if(connection.isConnected) return
        const db = await mongoose.connect(DB_URL)
        connection.isConnected = db.connections[0].readyState
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }    
}