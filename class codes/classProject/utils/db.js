import mongoose from "mongoose";  

const db = () => {

    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to mongoDB")
    })
    .catch((error) => {
        console.log("Failed connecting to mongoDB")
    })
}