import express from 'express'

const app = express()

function isMiddleware(req,res,next){
    console.log('request recieved')
    req.name = "harkirat"
    next();
}

app.get("/sum", isMiddleware, function(req, res) {
    console.log(req.name);
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    })
})

app.listen(3000,()=>{
    console.log('http://localhost:3000')
})
