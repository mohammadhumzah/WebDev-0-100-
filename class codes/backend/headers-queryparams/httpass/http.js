import express from 'express'

const app = express()

app.get('/sum', (req,res) => {
    const {a,b} = req.query
   
    Number(a)
    Number(b)

     if (isNaN(a) || isNaN(b)) {
                        return res.status(400).json({ error: "a and b must be numbers" })
                        }
    const sum = a + b

    res.json({sum: sum})

})

app.get('/divide', (req,res) => {
    const {a,b} = req.query
   
    Number(a)
    Number(b)

     if (isNaN(a) || isNaN(b) || b == 0) {
                        return res.status(400).json({ error: "a and b must be numbers or b cant be zero" })
                        }
    const divide = a / b
    console.log(divide)
    res.json({divide: divide})

})

app.listen(3000, () => {
    console.log('app listening on port http://localhost:3000')
})