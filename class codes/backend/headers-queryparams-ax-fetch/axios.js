const body = document.getElementById('posts')




async function getRecentPost() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1")
    console.log(response.data)

    body.innerHTML = response.data.title
}
getRecentPost()