const submissionButton = document.getElementById('submission')
const yourName = document.getElementById('naam')
const myMessageBox = document.querySelector('.message')
const myMessage = document.getElementById('my-message')
const detailing = document.querySelector('.detail')
const detailButtons = document.querySelector('.buttons')

messages = [
    "You make my days brighter 💕",
    "Lucky to have you 💖",
    "You are my favorite person ❤️"
    ]

submissionButton.addEventListener('click', () => {
    
    detailing.style.display = "none"
    detailButtons.style.display = "none"
    const naam_e_wafa = yourName.value.trim()
    if (naam_e_wafa === ""){
        return
    }

    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];
    detailing.style.display = "none"
    detailButtons.style.display = "none"
    myMessage.textContent = `Dear ${naam_e_wafa}, ${randomMessage}`
    myMessageBox.style.display = "flex"

   
})