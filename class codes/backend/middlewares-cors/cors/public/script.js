const sumButton = document.getElementById('sum')

sumButton.addEventListener('click', async () => {
    const a = Number(document.getElementById('a').value)
    const b = Number(document.getElementById('b').value)

    const response = await fetch('/sum', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ a, b })
    })

    const data = await response.json()

    alert(`Answer: ${data.answer}`)
})