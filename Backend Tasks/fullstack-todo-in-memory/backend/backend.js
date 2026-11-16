import express from 'express'
import crypto from 'crypto'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

let todos = []

app.get('/', (req,res) => {
    res.status(200).json(todos)
})


app.post('/todos', (req,res) => {
    const value = req.body.value?.trim()

    if(!value){
        return res.status(404).json({error: 'value is required'})
    }
    const todoItem = {id: crypto.randomUUID(), description:value}
    console.log(todoItem)

    todos.push(todoItem)
    console.log(todos)

    res.status(201).json({
        message: 'Todo added successfully',
        todo: todoItem

    })
})


app.put('/todos/:id', (req,res) => {
    const id = req.params.id
    const task = req.body.description
    const todo = todos.find(i => i.id === id)

    todo = {id: id, description:task}
    todos.push(todo)

    res.status(404).json({message: 'updated successfully',
                          updatedTodo: todo
    })

    
})


app.delete('/todos/:id', (req,res) => {
    const id = req.params.id
    const index = todos.findIndex(i => i.id === id)

    if(index === -1){
        return res.status(404).json({error: 'couldnt find that todo'})
    }

    todos.splice(index,1)
    res.status(200).json({message: 'deleted successfully'})

})


app.get('/todos/search', (req,res) => {
    const {q} = req.query
    if(!q){
        return res.status(404).json({error: 'query parameters missing'})
    } 

    // const todo = todos.filter(t => t.description.toLowerCase() === q.toLowerCase())     exact match
    const todo = todos.filter(t => t.description.toLowerCase().includes(q.toLowerCase()))

    res.status(200).json(todo)
})

app.delete('/todos', (req,res) => {
    todos = []
    res.json({message: 'Cleared all successfully'})
})


app.listen(3000, () => {
    console.log('backend listening at http://localhost:3000')
})