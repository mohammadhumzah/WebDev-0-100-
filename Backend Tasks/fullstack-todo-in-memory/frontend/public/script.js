const inputVal = document.getElementById('todo-input')
const addBttn = document.getElementById('add-btn')
const todoItemsContainer = document.getElementById('todo-items-container')
const searchBttn = document.getElementById('search-bttn')
const searchInput = document.getElementById('search-input')
const delAll = document.getElementById('delete-all')



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


searchBttn.addEventListener('click', async() => {
    const q = searchInput.value.trim()
    const response = await axios.get('http://localhost:3000/todos/search', {params: {q}})     // params: val builds the query string

    todoItemsContainer.innerHTML = ''
    response.data.forEach(todo => addTODOToDom(todo))               // goes over array of objects and send 1 object at a time to addtodom
    

})


async function updateTodo(wholeTodo){

    const response = await axios.put(`http://localhost:3000/todos/${wholeTodo.id}`,{description: 'Buy milk'})
    alert(`${response.data.message}`)
}


delAll.addEventListener('click', async() => {

    const response = await axios.delete('http://localhost:3000/todos')
    
    const items = document.querySelectorAll('li')
    for(let i of items){
        i.remove()
    }
    todoItemsContainer.innerText = response.data.message
    setTimeout(() => {
        todoItemsContainer.innerText = ''
    }, 1000)

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