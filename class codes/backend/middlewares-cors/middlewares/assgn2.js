import express from 'express'

const app = express()

let requestCounter = 0


app.get('/totalreq', (req,res)=>{
    res.json({message: `total requests sent are ${requestCounter}`})

})


app.use(function isMiddleware(req,res,next) {
    const num = requestCounter+=1                   // requestCounter = requestCounter + 1 then change console.log(requestCounter)
    console.log(`Total requests sent are ${num}`)
    next()
})

app.get("/sum", function(req, res) {
    const a =   Number(req.query.a);
    const b = Number(req.query.b);

    res.json({
        ans: a + b
    })
});

app.get("/multiply", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a * b
    })
});




app.listen(3000, () => {
    console.log('http://localhost:3000')
})
