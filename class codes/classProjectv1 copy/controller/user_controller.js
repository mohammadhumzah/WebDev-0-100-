import User from "../model-data/User_model.js" 
import crypto from "crypto"
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"  
import jwt from "jsonwebtoken" 
import dotenv from "dotenv"



const registerUser = async (request, response) => {
    
        //get data
        const {name, email, password} = request.body || {}
    
        //validate
        if(!name || !email || !password){
            return response.status(400).json({
                message: "All fields are required"
            })
          }

        //check if user already in db
        try{
                const existingUser = await User.findOne({email})
                if (existingUser){
                    return response.status(400).json({
                        message: "User already exists"
                    })
                }

        // if not then create user in db
                const user = await User.create({
                name,
                email,
                password
                })
                console.log(user)

        //if no user created
                if(!user){
                        return response.status(400).json({
                        message: "User not registered"
                        })
                    } 
        
        // create verification token using crypto builtin

                const token = crypto.randomBytes(32).toString('hex')
                console.log(token)
                user.verificationToken = token        // save token in db
                await user.save()
        
        // send email to user, the token stored in db
                const transporter = nodemailer.createTransport({
                    host: process.env.MAILTRAP_HOST,
                    port: process.env.MAILTRAP_PORT,
                    secure: false, // Use true for port 465, false for port 587
                    auth: {
                        user: process.env.MAILTRAP_USERNAME,
                        pass: process.env.MAILTRAP_PASSWORD,
                    },
                    });
                const mailOption = {
                    from: process.env.MAILTRAP_SENDERMAIL ,
                    to: user.email,
                    subject: "Verify your email ✔",
                    text: `please click on the link:
                    ${process.env.BASE_URL}/api/v1/users/verify/${token}`, // Plain-text version of the message
                    }
                await transporter.sendMail(mailOption)

        
        //send success status to user
                response.status(200).json({
                    message: "User registered succesfully",
                    success: true
                })
                }
        catch(error){
                console.log(error)
                response.status(500).json({
                message: "User not registered succesfully",
                success: false
            })
        } 
            
    }


const verifyUser = async(request, response) => {
    // get token from url that we sent the user through mail and he clicked
    const {token} = request.params
    // validate if token is there
    console.log(token)
    if(!token){
        return response.status(400).json({
            message: "invalid token"
        });
    }

    // find user in db who has this token
    const user = await User.findOne({verificationToken: token});
    if(!user){
        return response.status(400).json({
            message: "Invalid or expired token"
        });
    }

    // set isVerified field as true
    user.isVerified = true;
    // expire verification token
    user.verificationToken = undefined;
    // save user to db
    await user.save();
    // return response
    return response.status(200).json({
        message: "All done"
    });
}


const login = async(request, response) => {

    // get data from user
    const{email,password} = request.body

    // validate
    if(!email || !password){
        return response.status(400).json({
            message: "All fields are required"
        })
    }

    // check if user in db or not
    try{
        const user = await User.findOne({email})
        if(!user){
            return response.status(400).json({
            message: "Invalid email or password"
        })
    }

        const isMatch = await bcrypt.compare(password, user.password)   //(user ny diya hua pw, db mai store pw of that username), gives T or F
        console.log(isMatch)

        if(!isMatch){
            return response.status(400).json({
                message: "Invalid email or password"
            })
        }

        // if password matches create a session token and put it in users cookies

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'24h'})
        const cookieOptions = {
            httpOnly : true,        // user wont be able to mess with this
            secure: true
        }

            response.cookie("token",token, cookieOptions )   // set session token into user cookies
        response.status(200).json({
            success: true,
            message: "Login Successful"

        })

    }   
    catch(error){  
                console.log(error)
                response.status(500).json({
                message: "Couldn't login try again",
                success: false
            })}
}

const getMe = async(request,response) => {
    try {
        const user = await User.findById(request.user.id).select('-password');
        console.log(user);
        if(!user){
            return response.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        return response.status(200).json({
            success: true,
        });
    } catch (error) {
        return response.status(400).json({
            success: false,
            message: "Could not get that page"
        });
    }
}
const logoutUser = async(request,response) => {
    const cookieOptions = {
        httpOnly : true,        // user wont be able to mess with this
        expires: new Date(0)
    }
    try {
        response.cookie('token', '', cookieOptions);
        return response.status(200).json({
            success: true,
            message:"Logged out successfully"
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: "Logout failed"
        });
    }
}
const forgotPassword = async(request,response) => {
    try {
        //get email from req.body
        
        //find user based on email from db

        // if user found then resettoken+resetexpiry from .env using Date.now()+10*60*1000
        
        // save user in db

        //generate token using crypto

        // send email to user with token
        
    } catch (error) {
        
    }
}
const resetPassword = async(request,response) => {
    try {
        // collect token from params
        // password from req.body
        //
        
    } catch (error) {
        
    }
}

export {registerUser, verifyUser, login, getMe, logoutUser, forgotPassword,resetPassword}
