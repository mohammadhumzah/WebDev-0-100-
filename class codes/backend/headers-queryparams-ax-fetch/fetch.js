const body = document.getElementById('posts')




async function getRecentPost() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1")
    const data = await response.json()
    console.log(data)

    body.innerHTML = data.title
}
getRecentPost()