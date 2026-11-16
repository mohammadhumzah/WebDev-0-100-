const inputVal = document.getElementById('todo-input')
const addBttn = document.getElementById('add-btn')
const todoItemsContainer = document.getElementById('todo-items-container')
const searchBttn = document.getElementById('search-bttn')
const searchInput = document.getElementById('search-input')
const delAll = document.getElementById('delete-all')



function addTODOToDom(wholeTodo){
    const li = document.createElement('li')
    const text = document.createElement('span')
    text.textContent = wholeTodo.description

    if(wholeTodo.completed){text.classList.add('done')}

    text.addEventListener('click', async()=>{
        const newState = !text.classList.contains('done')

        try {
             const response = await axios.patch(`http://localhost:3000/todos/${wholeTodo.id}`, {completed: newState})
             text.classList.toggle('done', response.data.completed)          // element.classList.toggle(className, force) if completed is true add the class

        } catch (error) {
            console.error(error)
            alert('Something went wrong')
        }
        
    })

    
    const delbutton = document.createElement('button')
    delbutton.innerText = 'x'
    li.append(text,delbutton)

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

// function to display all the existing todos
async function getAlltodos(){

    try {
        const response = await axios.get('http://localhost:3000/')
    
        response.data.forEach(todo => addTODOToDom(todo))
    } 
    catch (error) {
        console.error(error)
        alert('Couldnt fetch todos')
    }
    
    

}

// function to display a newly added todo
addBttn.addEventListener('click', async () => {

    const value = inputVal.value 
    
    try {
         const response = await axios.post('http://localhost:3000/todos', {value})
    
         const todo = response.data.todo
    
         addTODOToDom(todo)

         inputVal.value = ''
    } 
    catch (error) {
         console.error(error)
         alert('Could not create that')
    }
    
    
})

// function to show the result of the searched todo
searchBttn.addEventListener('click', async() => {
    const q = searchInput.value.trim()

    try {
        const response = await axios.get('http://localhost:3000/todos/search', {params: {q}})     // params: val builds the query string

        todoItemsContainer.innerHTML = ''
        response.data.forEach(todo => addTODOToDom(todo))               // goes over array of objects and send 1 object at a time to addtodom
        
    } catch (error) {
        console.error(error)
        alert('Search Failed')
    }
    

})

// function to delete all the todos
delAll.addEventListener('click', async() => {

    try {
         const response = await axios.delete('http://localhost:3000/todos')

        const items = document.querySelectorAll('li')
        for(let i of items){
        i.remove()
    }
    todoItemsContainer.innerText = response.data.message
    setTimeout(() => {
        todoItemsContainer.innerText = ''
    }, 1000)

    } 
    catch (error) {
        console.error(error)
        alert('Could not delete all todos')
    }
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

    
    li.appendChild(createdelbutton(wholeTodo.id,li),text)

    todoItemsContainer.appendChild(li)
}
*/