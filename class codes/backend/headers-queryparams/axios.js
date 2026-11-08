const body = document.getElementById('posts')




async function getRecentPost() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1")
    console.log(data)

    body.innerHTML = data.title
}
getRecentPost()