import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import db from "./utils/db.js"


const app = express()
const port = process.env.PORT || 4000  //.env m likha huwa port use krlo agar available ni to 3000 krlo

app.use(cors({
    origin: process.env.BASE_URL,
    allowedHeaders: ['Content-Type'],
    methods: ['GET', 'POST']
}))

app.use(express.json()) // backend accepts json format data

app.get('/', (request, response) => {      
  response.send('huhaha')
})

app.get('/humzah', (request, response) => {
    response.send('humzah')
})

app.listen(port, () => {            // poore computer p get request nahi sunnegay
  console.log(`Example app listening on port ${port}`)
})


