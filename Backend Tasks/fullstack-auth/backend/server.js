import { error } from 'console'
import express from 'express'
import jwt from  'jsonwebtoken'
import path from 'path'

const app = express()
app.use(express.json())
app.use(express.static(path.join(import.meta.dirname, '../frontend')))


const users = []
const JWT_SECRET = 'ssshhh'

//Middleware Auth
function auth(req,res,next){
    const tok = req.headers.authorization

    if(tok){
      try {
        const payload = jwt.verify(tok, JWT_SECRET)
        req.user = payload
        console.log(req.user)
        next()
    } 
    catch (error) {
        return res.status(404).json({error: error.message})
    }
    }else{
        return res.json({error: 'Unauthorized'})
    }
    
}

// Controllers
app.post('/signup', function(req,res){
    const username = req.body.username 
    const password = req.body.password 

    if(!username || !password){
        return res.status(404).json({error: 'Invalid username or password'})
    }

    users.push({
        username:username,
        password: password
    })
    console.log('users=' , users)

    res.status(200).json({
        message: 'Signed Up Successfully'
    })
})

app.post('/signin', function(req,res){
    const username = req.body.username
    const password = req.body.password

    if(!username || !password){
        return res.status(404).json({error: 'Invalid username or password'})
    }

    const user = users.find(u => u.username === username && u.password === password)
    if(user){
        const tok = jwt.sign({username: user.username}, JWT_SECRET)

        res.json({message:'Signed In Successfully',
            token: tok
        })
    }
    else{
        return res.status(404).json({error:'User doesnt exist'})
    }
})

app.get('/me', auth, function (req,res){
    const user = users.find(u => u.username === req.user.username)
    console.log("user in /me =" , user)
    if(!user){
        return res.status(404).json({error: 'user not found'})
    }
    res.json({
        username: user.username,
        password: user.password
    })
})



app.listen(3000,()=>{
    console.log('app listenin at http://localhost:3000')
})