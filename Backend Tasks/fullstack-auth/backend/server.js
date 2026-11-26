import express from 'express'
import jsonwebtoken from  'jsonwebtoken'

const app = express()
app.use(express.json())

const users = []
const JWT_SECRET = 'ssshhh'

//Middleware Auth
function auth(req,res,next){
    const tok = req.headers.authorization
    try {
        
    } catch (error) {
        
    }
}

// Controllers
app.post('/signup', function(req,res){
    const username = req.body.username
    const password = req.body.password

    users.push({
        username:username,
        password: password
    })

    res.status(200).json({
        message: 'Signed Up Successfully'
    })
})

app.post('/signin', function(req,res){
    const username = req.body.username
    const password = req.body.password

    const user = users.find(u => u.username === username && u.password === password)
    if(user){
        const tok = jwt.sign({username: user.username}, JWT_SECRET)

        res.json({message:'Signed In Successfully',
            token: tok
        })
    }
})

app.get('/me', function (req,res){

})