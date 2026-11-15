const inputVal = document.getElementById('todo-input')
const addBttn = document.getElementById('add-btn')
const todoItemsContainer = document.getElementById('todo-items-container')

function addTODOToDom(wholeTodo){
    const li = document.createElement('li')
    li.textContent = wholeTodo.description

    const delbutton = document.createElement('button')
    delbutton.innerText = 'x'
    li.appendChild(delbutton)

    delbutton.addEventListener('click', async () => {

        try {
             const response = await axios.delete(`http://localhost:3000/todos/${wholeTodo.id}`)
             li.remove()
             alert(`${response.data.message}`)
        } 
        catch (error) {
            console.error(err)
            alert('Could not delete the todo')
        }  
    })

    todoItemsContainer.appendChild(li)
}


async function getAlltodos(){
    const response = await axios.get('http://localhost:3000/')
    

    response.data.forEach(todo => addTODOToDom(todo))
    

}


addBttn.addEventListener('click', async () => {

    const value = inputVal.value 

    const response = await axios.post('http://localhost:3000/todos', {value})
    
    const todo = response.data.todo
    
    addTODOToDom(todo)

    inputVal.value = ''
    
})


getAlltodos()



/*

// another way of writing delete functionality
function createdelbutton(id, li){
    const del = document.createElement('button')
    del.innerText = 'x'

    del.addEventListener('click', async()=>{
         const response = await axios.delete(`http://localhost:3000/todos/${id}`)
         li.remove()
    
    })
    return del
    
}

// but then we would have to change addtodotodom(wholeTodo) as 
function addTODOToDom(wholeTodo){
    const li = document.createElement('li')
    li.textContent = wholeTodo.description

    
    li.appendChild(createdelbutton(wholeTodo.id,li))

    todoItemsContainer.appendChild(li)
}
*/