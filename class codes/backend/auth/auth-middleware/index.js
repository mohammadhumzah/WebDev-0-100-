import express from 'express'
import jwt from 'jsonwebtoken'


const app = express()
app.use(express.json())


const users = []     // looks something like [{username:'humzah', password:'123', token: ffhhdbf2}, {username:'haji', password:'hh27', token: fjjfjcks}]
const JWT_SECRET = 'sshhh'


// Middlewares
async function auth(req,res,next){
    console.log('------------CONTROL REACHED HERE------')
    const tok = req.headers.authorization

   if(tok){
    try {
        const payload = jwt.verify(tok, JWT_SECRET) 
        console.log(payload)
        req.user = payload
        next()           
    } catch (error) {
        return res.status(401).json({ error: error.message })
    }
     
   }
   else{
    return res.status(404).json({error: 'unauthorized'})
   }
}


// Controller Functions
async function signupHandler(req,res,next){
    const username = req.body.username
    const password = req.body.password

    // For an Express API where username must be a non-empty string:
    if(typeof username !== 'string' || !username.trim()){
        return res.json({error:'Please enter valid username'})
    }
    // Validation to check whether user already exists in db/variable
    if(users.find(user => user.username === username)){
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
    res.header("tokenhai", tok)
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

    const user = users.find(u => u.username === req.user.username)        

    res.status(200).json({
        username: user.username,
        password: user.password
    })
}


// Controllers
app.post('/signup', signupHandler)

app.post('/signin', signinHandler)

app.get('/me', auth, getMe)

app.use((req,res)=>{
    return res.send('Nigga this doesnt match anything we have')
})




app.listen(3000, ()=>{
    console.log('App listening at port http://localhost:3000')
})    