import express from 'express'
import fs from 'fs'
import crypto from 'crypto'


const app = express()
app.use(express.json())

app.get('/todos', function (req,res){
    fs.readFile('todos.json', 'utf-8', (err,data) => {
        if(err) throw err
        res.json(JSON.parse(data))
    })
})


app.get('/todos/:id', function (req,res){
   fs.readFile('todos.json', 'utf-8', (err,data) => {
    if(err){
        return res.status(404).json({error: 'couldnt read todos'})
    }
    const todos =JSON.parse(data)
    console.log(todos)

    const id = req.params.id
    const todoItem = todos.find(i => i.id === id)
    console.log(todoItem)

    res.status(200).json(todoItem)
   })
})


app.post('/todos', function(req,res){
    const {title, done} = req.body
    const id = crypto.randomUUID()
    const newTodo = {id: id, title, done}

    fs.readFile('todos.json', 'utf-8', (err,data) => {
    if(err){
        return res.status(404).json({error: 'couldnt read todos'})
    }
    const todos =JSON.parse(data)
    todos.push(newTodo)
    fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
    if (err) return res.status(500).json({ error: 'could not save' })
    res.status(200).send()
    
})

}) 
})


app.put('/todos/:id', function (req,res){
    const id = req.params.id
    const {title,done} = req.body
    fs.readFile('todos.json', 'utf-8', (err,data) => {
        if(err){
            return res.status(404).json({error: 'couldnt read todos'})
        }
        const todos = JSON.parse(data)
        const index = todos.findIndex(t => t.id === id)
        if(index === -1){
           return res.status(404).send()
        }
        todos[index] = {id: id, title, done}

        fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
            if (err) return res.status(500).json({ error: 'could not save' })
            res.status(200).json({id:id, title: title, done: done})
        })
    })
})


app.delete('/todos/:id', function (req,res){
    const id = req.params.id
    fs.readFile('todos.json', 'utf-8', (err,data) => {
        if(err){
            return res.status(400).json({error:"couldnt read todos"})
        }
        const todos = JSON.parse(data)
        const index = todos.findIndex(t => t.id === id)
        if(index === -1){
           return res.status(404).send()
        }

        todos.splice(index,1)
        fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
            if (err) return res.status(500).json({ error: 'could not save' })
            res.status(200).json({message:'deleted'})
            
        })
        
    })
})



app.use((req,res) => {
    res.status(404).json({error: 'this route doesnt exist'})
})

app.listen(3000, () => {
    console.log('app listenin at port http://localhost:3000')
})