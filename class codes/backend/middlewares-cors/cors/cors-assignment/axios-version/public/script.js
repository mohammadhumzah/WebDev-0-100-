const first = document.getElementById('a')
const second = document.getElementById('b')
const adder = document.getElementById('bttn')


adder.addEventListener('click', async () => {
    const a = Number(first.value)
    const b = Number(second.value)

    const response = await axios.post('http://localhost:3001/sum',{ a, b })     // Axios jsonifies outgoing post req body and then also parses and reads incoming data so no need of data = response.json(), it does this internally and create data object with actual data ready to be read.
   
    console.log(response)
    alert(`Answer: ${response.data.answer}`)

})

