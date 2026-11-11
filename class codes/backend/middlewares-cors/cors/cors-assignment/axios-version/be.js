import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.post('/sum', (req,res) => {

    const a = Number(req.body.a)
    const b = Number(req.body.b)

    res.json({
        answer: a + b
    })
})


app.listen(3001, () => {
    console.log('app listenin at http://localhost:3001')
})