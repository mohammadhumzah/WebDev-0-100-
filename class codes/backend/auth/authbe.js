import express from 'express'


const app = express()
app.use(express.json())

const users = []     // looks something like [{username:'humzah', password:'123', token: ffhhdbf2}, {username:'haji', password:'hh27', token: fjjfjcks}]


function generate_token(){
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
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
    const tok = generate_token()
    user.token = tok
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
    const user =  users.find(u => u.token === tok)
    console.log(user)
    if(!user){
        return res.status(404).json({error: 'You are not authorized'})
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