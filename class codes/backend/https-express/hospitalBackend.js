import express from "express"

// create an in-memory(in variable) array of kidneys and users

let users = [
    { id: 1, name: "Humzah", kidneys: [{ healthy: false }, { healthy: true }] },
    { id: 2, name: "Sara",   kidneys: [{ healthy: true }, { healthy: true }] }
]

let nextID = 3


// initialise express
const app = express()
app.use(express.json())

/*
User Routes

app.get("/", function(req,res){

    const totalKidney = users[0].kidneys
    console.log(totalKidney)
    const numberOfKidneys = totalKidney.length
    console.log(numberOfKidneys)
    
    //check how many of the kidneys are healthy
    const healthyKidneys = users[0].kidneys.filter(k => k.healthy === true)
    console.log(healthyKidneys)

    const healthyKidneyNum = healthyKidneys.length
    console.log(healthyKidneyNum)

    // send response
    res.json({
        name: users[0].name,
        number : numberOfKidneys,
        healthyones : healthyKidneyNum
    })

}) This works if we have a single user for multiusers we need to collect something
*/

// to get all users and data
app.get('/', function(req,res){
    console.log(users)
    res.json(users)
})

// to get data of a particular user based on an id
app.get('/:id', function(req,res){

    const id = Number(req.params.id)
    const user = users.find(u => u.id === id)             // this put whole object of inside of user like {id:1, name: humzah, kidneys:[{healthy:false}]} so easy to work with

    if(!user){
       return res.status(404).json({
            error: 'user not found'
        })
    }

    const healthyKids = user.kidneys.filter(k => k.healthy).length

    //send response
    res.json({
        name: user.name,
        totalKidneys: user.kidneys.length,
        healthyKidneys: healthyKids
})

})

// to add a new user along with his data (need to send json in req)
app.post('/', function(req,res){
    const {name, kidneys} = req.body
    if(typeof name !== "string" || !name.trim()){
        return res.status(404).json({error: "name is required"})
    }
    if (!Array.isArray(kidneys)) {
        return res.status(400).json({ error: "kidneys must be an array" })
    }

    const user = {id: nextID++, name, kidneys}
    users.push(user)
    res.json(user)
})

// to add kidneys to an existing user(need to send json)
app.post('/:id/kidneys', function(req,res){
    const id = Number(req.params.id)
    const user = users.find(u => u.id === id)
    if(!user){
       return res.status(404).json({
            error: "user not found"
        })
    }

     const {kidneys} = req.body                 // destructure body can use {kidneys,count}
     const list = Array.isArray(kidneys) ? kidneys:[kidneys]         // Array.isArray(argument) checks whether argument is an array or not. we want always to have an array even if only pne kidney is getting pushed at a time
     user.kidneys.push(...list)              // spread operator pushes the json array {"kidneys":[{"healthy":false} ,{"healthy":true}]} as push(a,b)
     console.log(user)

     res.json({
        name: user.name,
        totalKidneys: user.kidneys.length
     })
    

})

// to change kidney health needs to send json data as {healthy:true}
app.put("/:id/kidneys/:n", function(req,res){
    const id = Number(req.params.id)
    const n = Number(req.params.n)
    const user = users.find(u => u.id === id)
    if(typeof req.body.healthy !== 'boolean'){
        return res.status(400).json({error: "true or false expected"})
    }
    user.kidneys[n] = {healthy: req.body.healthy}
    res.status(200).json({
        name: user.name,
        healthyKids: user.kidneys.filter(k => k.healthy).length
    })

})

// to delete a user and his all info based on id
app.delete('/:id', function(req,res){
    const id = Number(req.params)
    const index = users.findIndex(u => u.id === id)

    if (index === -1) {
        return res.status(404).json({ error: "user not found" })
    }

    users.splice(index,1)
    res.json({message:"user deleted"})
})

// to delete a users kidney
app.delete("/:id/delete/:n", function(req,res){
    const id = Number(req.params.id)
    const n = Number(req.params.n)
    const user = users.find(u => u.id === id)
    if(!user){
        return res.status(404).json({
            error: "user not found"
        })
    }

    user.kidneys.splice(n,1)
    console.log(user)

    res.json({
        name: user.name,
        totalKidneys: user.kidneys.length
     })

})

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

