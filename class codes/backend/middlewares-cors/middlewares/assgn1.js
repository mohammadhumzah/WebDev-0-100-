import express from 'express'
import { url } from 'node:inspector'

const app = express()

app.use(function isMiddleware(req,res,next) {
    console.log(req.method)
    console.log(req.url)
    console.log(new Date())
    next()
})

app.get('/', function(req,res){
    res.json({message: `hey did you send a ${req.method}  request`})
})

app.post('/', (req,res) => {
    res.json({message: 'its done bro'})
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})

