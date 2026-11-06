import express from 'express'

const app = express()

let todos = []

app.use(express.json())

app.get('/todos', (req,res) => {
    console.log(todos)
    res.status(200).json(todos)
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
    const todoItem = {id: todos.length + 1, title, completed}
    console.log(todoItem)
    todos.push(todoItem)

    res.status(201).json({
        message: 'todo created'
    })
})

app.put('/todos/:id', (req,res) => {
    const id = Number(req.params.id)
    const {title,completed} = req.body
    const index = todos.findIndex(i => i.id === id )
    if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    todos[index] = {id: id, title, completed}

    res.json({
        id: id,
        title: title,
        completed: completed
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

app.use('*', (req,res) => {
    res.status(404).json({error:'No such route exists'})
})

app.listen(3001, () => {
    console.log('App running at port http://localhost:3001')
})