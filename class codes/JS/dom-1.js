function changeColor(color){
    document.body.style.backgroundColor = color
}

// METHOD 1
// const darkmode = document.getElementById('dark-mode')
// const lightmode = document.getElementById('light-mode')
// darkmode.addEventListener('click', function(){
//     changeColor('black')

// })

// lightmode.addEventListener('click', function(){
//     changeColor('white')
// })


const mode = document.getElementById('theme')
mode.addEventListener('click', () => {
    
    const currentColor = document.body.style.backgroundColor
    if(!currentColor || currentColor == 'white'){
        changeColor('black')
        mode.innerText = 'Light Mode'
    }
    else{
        changeColor('white')
        mode.innerText = 'Dark Mode'
    }
})

