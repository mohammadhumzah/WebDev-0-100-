import mongoose from "mongoose";    

// Defining schema of db
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default:"user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken:{
        type: String,
    },
    resetPasswordToken:{
        type: String,
    },
    resetPasswordexpiry:{
        type: Date,
    }
}, {
    timestamps: true,
})



// Putting that schema into mongoDB, and storing its reference in a variable
const User = mongoose.model("User", userSchema)        // (kis-p-banau,kis-ki-base-p-banau)

export default User 