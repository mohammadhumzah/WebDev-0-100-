import express from 'express'
import jwt from 'jsonwebtoken'


const app = express()
app.use(express.json())


const users = []     // looks something like [{username:'humzah', password:'123', token: ffhhdbf2}, {username:'haji', password:'hh27', token: fjjfjcks}]
const JWT_SECRET = 'sshhh'

// Controller Functions
async function signupHandler(req,res,next){
    const username = req.body.username
    const password = req.body.password

    // For an Express API where username must be a non-empty string:
    if(typeof username !== 'string' || !username.trim()){
        return res.json({error:'Please enter valid username'})
    }
    // Validation to check whether user already exists in db/variable
    if(users.find(user => user.users === username)){
        return res.json({error: 'user already exists'})
    }

    users.push({
        username: username,
        password: password
    })
    console.log(users)

    res.json({message: "successfully signedup"})
}

async function signinHandler(req,res,next){
    const username = req.body.username
    const password = req.body.password

    const user =  users.find((u) => u.username === username && u.password === password)

    if(user){
    const tok = jwt.sign({username:user.username}, JWT_SECRET)                         // convert thr username to encoded jwttoken with username as payload
    res.json({message: 'signedin successfully',
        token: tok
    })
    console.log(users)
    }
    else{
        res.json({error: 'user not found'})
    }
    
}

async function getMe(req,res,next) {
    const tok = req.headers.authorization
    console.log(tok)
    const userDetails = jwt.verify(tok, JWT_SECRET)         // sends decoded payload generally as JS object

   

    const user = users.find(u => u.username === userDetails.username)
    console.log(user)
    if(!user){
        return res.status(404).json({error: 'Couldnt find user'})
    }

    res.status(200).json({
        username: user.username,
        password: user.password
    })
}

// Controllers
app.post('/signup', signupHandler)

app.post('/signin', signinHandler)

app.get('/me', getMe)


app.listen(3000, ()=>{
    console.log('App listening at port http://localhost:3000')
})