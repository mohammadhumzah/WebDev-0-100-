const lightMode = document.getElementById('light-mode')

lightMode.addEventListener('click', () => {
    document.body.classList.toggle('day-mode')

    if(document.body.classList.contains('day-mode')) {
        lightMode.innerText = 'Dark Mode'
    }
    else {
        lightMode.innerText = 'Light Mode'
    }

})