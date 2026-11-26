const signupEmail = document.getElementById('signup')
const signupPass = document.getElementById('sup')

const loginEmail = document.getElementById('signin')
const loginPass = document.getElementById('sip')

const signupButt = document.getElementById('signup-butt')
const signinButt = document.getElementById('signin-butt')
const logoutButt = document.getElementById('logout-butt')

signupButt.addEventListener('click', async function(){
    const username = signupEmail.value
    const password = signupPass.value

    try {
        const response = await axios.post('http://localhost:3000/signup', {username, password})
        alert(response.data.message)
        signupEmail.value = ''
        signupPass.value = ''
    } catch (error) {
        console.error(error)
        alert('Could not Signup')
    }
})

signinButt.addEventListener('click', async function(){
    const username = loginEmail.value
    const password = loginPass.value

    try {
        const response = await axios.post('http://localhost:3000/signin', {username,password})
        localStorage.setItem("token", response.data.token)
        alert(response.data.message)
    } catch (error) {
        console.error(error)
        alert('Could not signin')
    }
})


logoutButt.addEventListener('click', async function(){
    localStorage.removeItem('token')
})

async function getUserInformation(){
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:3000/me', {token})
}