const first = document.getElementById('a')
const second = document.getElementById('b')
const adderBttn = document.getElementById('bttn')


adderBttn.addEventListener('click', async() =>{
    const a = Number(first.value)
    const b = Number (second.value)

    try {
          const response = await fetch('http://localhost:3001/sum', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({a,b})
    })
    // fetch considers 404 to be successful so we need to explicitly throw error and send it to catch block
    if(!response.ok){
        throw new Error(`HTTP Error: ${response.status}`)
    }
    const data = await response.json()
    console.log(data)
    alert(`Answer is ${data.answer}`)
    } 
    
    catch (error) {
        console.log(error.message);
        alert("Request failed");
    }
    
})