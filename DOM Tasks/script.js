const todoInput = document.getElementById('todo-input')
const addbtn = document.getElementById('add-btn')
const todoItemsContainer = document.getElementById('todo-items-container')
const clearAll = document.getElementById('clear-all')

// Now we are adding listener that when user clicks the button do this function

addbtn.addEventListener('click', () => { 

// Take whatever written inside input and put it in variable called value with the help of .value
    const value = todoInput.value
    
// Now create a dynamic list that create list tags dynamically   
    const li = document.createElement('li')

// Now add the user input into the list tag
    li.innerText = value

// When task finished have to delete the task
    const delButton = document.createElement('button')
    delButton.innerText = 'x'

// Add this delButton to each li dynamically
    li.appendChild(delButton)

// Delete the task when clicked on x, so use event listener
    delButton.addEventListener('click', function() {
        li.remove()
    })

// Add both the list item and its button to ul
     todoItemsContainer.appendChild(li)

// Now after taking one input, clear the input box
    todoInput.value = ''

})

clearAll.addEventListener('click', () => {
    const item = todoItemsContainer.querySelectorAll('li')
    if(item.length > 0){
        for(let i of item){
            i.remove()
        }


    }
})