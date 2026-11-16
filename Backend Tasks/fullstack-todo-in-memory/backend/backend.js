import express from 'express'
import crypto from 'crypto'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

let todos = []

// route for getting all the todos
app.get('/', (req,res) => {
    res.status(200).json(todos)
})

// route for posting new todo
app.post('/todos', (req,res) => {
    const value = req.body.value?.trim()

    if(!value){
        return res.status(404).json({error: 'value is required'})
    }
    const todoItem = {id: crypto.randomUUID(), description:value, completed: false}
    console.log(todoItem)

    todos.push(todoItem)
    console.log(todos)

    res.status(201).json({
        message: 'Todo added successfully',
        todo: todoItem

    })
})

//route for updating a todo
app.patch('/todos/:id', (req,res) => {
    const id = req.params.id
    const {description,completed} = req.body
    
    const todo = todos.find(i => i.id === id)
    if(!todo){
        return res.status(404).json({error: 'could not find the todo'})
    }
    
    // if description is sent and that needs to be changed
    if(description !== undefined){
       const trimmed = description?.trim()
        if(!trimmed){
            return res.status(400).json({error: 'description cant be empty'})
        }
        todo.description = trimmed
    }

    //if completion status is sent and that needs to be changed
    if(completed !== undefined && typeof completed == 'boolean'){
        todo.completed = completed
    }

    res.status(200).json({wholeTodo: todo})

    
})

//route for deleting a todo
app.delete('/todos/:id', (req,res) => {
    const id = req.params.id
    const index = todos.findIndex(i => i.id === id)

    if(index === -1){
        return res.status(404).json({error: 'couldnt find that todo'})
    }

    todos.splice(index,1)
    res.status(200).json({message: 'deleted successfully'})

})

//route for searching a todo
app.get('/todos/search', (req,res) => {
    const {q} = req.query
    if(!q){
        return res.status(404).json({error: 'query parameters missing'})
    } 

    // const todo = todos.filter(t => t.description.toLowerCase() === q.toLowerCase())     exact match
    const todo = todos.filter(t => t.description.toLowerCase().includes(q.toLowerCase()))

    res.status(200).json(todo)
})

//route for deleting all todos
app.delete('/todos', (req,res) => {
    todos = []
    res.json({message: 'Cleared all successfully'})
})


app.listen(3000, () => {
    console.log('backend listening at http://localhost:3000')
})