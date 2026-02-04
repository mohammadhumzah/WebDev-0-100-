// Create var and find the keypad and screen element with help of query selector
const keypad = document.querySelector('.keypad')
const screen = document.querySelector('.screen input')
const clear = document.querySelector('.clear')

keypad.addEventListener ('click', (even) => {

    // Check if button was clicked or not
    if(even.target.tagName === 'BUTTON'){
        // Use .target to know which exact element triggered event, .dataset.type to get custom dataset of triggerer
        const buttonType = even.target.dataset.type
        let buttonValue = even.target.textContent

        if(buttonValue === '✖️'){
            buttonValue = '*'
        }

        // Handle based on type of input - INSIDE HERE!
        if(buttonType === 'number' || buttonType === 'operator'){
            screen.value += buttonValue
        }
        else if (buttonType === 'equal') {
            screen.value = eval(screen.value)
        }
    }
})

clear.addEventListener('click', () =>{
    screen.value = '' 
})