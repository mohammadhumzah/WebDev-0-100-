const first = document.getElementById('a')
const second = document.getElementById('b')
const adderBttn = document.getElementById('bttn')


adderBttn.addEventListener('click', async() =>{
    const a = Number(first.value)
    const b = Number (second.value)

    const response = await fetch('http://localhost:3001/sum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({a,b})
    })

    const data = await response.json()
    console.log(data)
    alert(`Answer is ${data.answer}`)
})