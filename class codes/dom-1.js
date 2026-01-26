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
mode.addEventListener('click', () =>{

    console.log(document.body.style.backgroundColor)

})

