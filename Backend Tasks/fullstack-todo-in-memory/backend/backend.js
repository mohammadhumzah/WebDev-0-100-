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


app.delete('/todos/delete/:id', (req,res) => {

})


app.listen(3000, () => {
    console.log('backend listening at http://localhost:3000')
})