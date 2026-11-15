const first = document.getElementById('a')
const second = document.getElementById('b')
const adder = document.getElementById('bttn')


adder.addEventListener('click', async () => {
    const a = Number(first.value)
    const b = Number(second.value)
    try {
         const response = await axios.post('http://localhost:3001/sum',{ a, b })     
         console.log(response)

         alert(`Answer: ${response.data.answer}`)
    } 
    
    catch (error) {
          console.log(error.response?.status);
          console.log(error.response?.data);

          alert("Request failed");
    }
   

})

