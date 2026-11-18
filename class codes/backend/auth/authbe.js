import express from 'express'


const app = express()
app.use(express.json())

const users = []     // looks something like [{username:'humzah', password:'123', token: ffhhdbf2}, {username:'haji', password:'hh27', token: fjjfjcks}]


async function signupHandler(req,res,next){
    const username = req.body.username
    if(!username)
}


async function signinHandler(req,res,next){

}






app.post('/signup', signupHandler)

app.post('/signin', signinHandler)


app.listen(3000, ()=>{
    console.log('App listening at port http://localhost:3000')
})