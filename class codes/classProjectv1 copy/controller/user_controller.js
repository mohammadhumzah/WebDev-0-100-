import User from "../model-data/User_model.js" 
import crypto from "crypto"
import nodemailer from "nodemailer"

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
     
    // validate if token is thr
     console.log(token)
     if(!token){
        return response.status(400).json({
            message: "invalid token"
        })
     }

    // find user in db who has this token
     await User.findOne({verificationToken: token})

    // set isVerified field as true
     user.isVerified = true

    // expire verification token
     user.verificatinToken = undefined

    // save user to db
    await user.save()

    // return response
     response.status(200).json({
        message: "All done"
     })
}

export {registerUser, verifyUser}
