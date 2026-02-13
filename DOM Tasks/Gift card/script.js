const submissionButton = document.getElementById('submission')
const yourName = document.getElementById('naam')
const myMessageBox = document.querySelector('.message')
const myMessage = document.getElementById('my-message')
const detailing = document.querySelector('.detail')
const detailButtons = document.querySelector('.buttons')

const messages = [
  "I like how things make more sense when you’re around.",
  "You have a way of making silence feel comfortable.",
  "Nothing about you is loud, but everything about you stays.",
  "You make ordinary moments feel intentional.",
  "I don’t think about it much, but I’d choose you again.",
  "You’re easy to be with. That matters.",
  "It’s not dramatic. It’s just… right.",
  "You feel steady in a way that’s rare.",
  "I’m better in small ways because of you.",
  "My favorite place is wherever you are 💖",
  "You are the reason I smile for no reason 💕",
  "Every moment with you matters ❤️",
  "You turned my “okay” days into great ones 💘",
  "You are my calm and my chaos, perfectly 💖",
  "Somehow, you feel like home ❤️",
  "You make life lighter just by being in it 💕",
  "I didn’t know I needed you until I met you 💘",
  "You are my best surprise ❤️"
];

submissionButton.addEventListener('click', () => {

    const naam_e_wafa = yourName.value.trim()
    if (naam_e_wafa === ""){
        return
    }
    
    detailing.style.display = "none"
    detailButtons.style.display = "none"

    setTimeout( () => {
        myMessageBox.classList.add("open")
    },100)
   

    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];
    myMessage.textContent = `Dear ${naam_e_wafa}, ${randomMessage}`
    document.body.classList.add("blur-bg")

    setTimeout( () => {
        myMessageBox.style.display = "none"
        detailing.style.display = "flex"
        detailButtons.style.display = "flex"
        document.body.classList.remove("blur-bg")
        yourName.value = ""
        yourName.focus()
    }, 3000)

   
})