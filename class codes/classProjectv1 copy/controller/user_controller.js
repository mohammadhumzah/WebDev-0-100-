import User from "../model-data/User_model" 


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

       //if no user created
       if(!user){
            return response.status(400).json({
            message: "User not registered"
            )}
    } 
    
    
    
    catch(error){

    }

    

        // create verification token
        
        // save token in db

        // send to user the token stored in db

        // send token as email to user

        //send success status to user
}

export {registerUser}
