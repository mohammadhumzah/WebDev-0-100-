import express from 'express'

const app = express()

let todos = [
                {id:1,
                title: "Learn Express.js",
                completed: false
                } ,

                {id:2,
                title: "Build to-do",
                completed: true
                } 
]

app.use(express.json())

let nextId = 3

app.get('/todos', (req,res) => {
    console.log(todos)
    res.status(200).json({allTodos: todos})
})

app.get('/todos/:id', (req,res) => {
    const id = Number(req.params.id)
    

   const todoItem = todos.find(t => t.id === id) 
    if (!todoItem){
        res.status(404).json({error:'cant find a todo with this id'})
    }
    console.log(todoItem)
    res.json(todoItem)
  
})

app.post('/todos', (req,res) => {
    const {title,completed} = req.body
    const todoItem = {id: nextId++, title, completed}
    console.log(todoItem)
    todos.push(todoItem)

    res.status(201).json({
        message: 'todo created'
    })
})

app.put('/todos/:id', (req,res) => {
    const id = Number(req.params.id)

    const index = todos.findIndex(i => i.id === id )
    todos[index] = {id: id, title: req.body.title, completed: req.body.completed}

    res.json({
        id: id,
        title: req.body.title,
        completed: req.body.completed
    })
})

app.delete('/delete/:id', (req,res) => {
    const id = Number(req.params.id)
    const todoItemNo = todos.findIndex(i => i.id === id)
    if (todoItemNo === -1) {
        return res.status(404).json({ error: "todo not found" })
    }

    todos.splice(todoItemNo,1)

    res.status(200).json({message: 'todo successfully deleted'})
})

app.listen(3000, () => {
    console.log('App running at port http://localhost:3000')
})