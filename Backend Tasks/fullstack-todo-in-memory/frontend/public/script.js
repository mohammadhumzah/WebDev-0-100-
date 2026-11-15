const inputVal = document.getElementById('todo-input')
const addBttn = document.getElementById('add-btn')
const todoItemsContainer = document.getElementById('todo-items-container')

function addTODOToDom(description){
    const li = document.createElement('li')
    li.textContent = description

    const delbutton = document.createElement('button')
    delbutton.innerText = 'x'
    li.appendChild(delbutton)

    delbutton.addEventListener('click', async () => {
        const response = axios.delete('http://localhost:3000/todos/delete/id')
        li.remove()
    })
    todoItemsContainer.appendChild(li)
}

async function getAlltodos(){
    const response = await axios.get('http://localhost:3000/')
    

    response.data.forEach(todo => addTODOToDom(todo.description))
    

}

addBttn.addEventListener('click', async () => {

    const value = inputVal.value 

    const response = await axios.post('http://localhost:3000/todos', {value})
    
    const todoItem = response.data.todo
    
    addTODOToDom(todoItem)

    inputVal.value = ''
    
})




getAlltodos()