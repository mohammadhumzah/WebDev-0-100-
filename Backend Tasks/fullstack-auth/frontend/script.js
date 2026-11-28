
const signupEmail = document.getElementById('signup')
const signupPass = document.getElementById('sup')

const loginEmail = document.getElementById('signin')
const loginPass = document.getElementById('sip')


const signupButt = document.getElementById('signup-butt')
const signinButt = document.getElementById('signin-butt')
const logoutDiv = document.getElementById('logout')


signupButt.addEventListener('click', async function(){
    const username = signupEmail.value.trim()
    const password = signupPass.value.trim()

    try {
        const response = await axios.post('http://localhost:3000/signup', {username, password})
        alert(response.data.message)
        signupEmail.value = ''
        signupPass.value = ''
    } 
    catch (error) {
        console.error(error)
        alert('Could not Signup')
    }
})

signinButt.addEventListener('click', async function(){
    const username = loginEmail.value
    const password = loginPass.value

    try {
        const response = await axios.post('http://localhost:3000/signin', {username,password})
        console.log(response.data)
         loginEmail.value = ''
         loginPass.value = ''
        
        localStorage.setItem("token", response.data.token)
        getUserInformation()
        alert(response.data.message)
    } 
    catch (error) {
        console.error(error)
        alert(error.response.data.error)
    }
})


async function getUserInformation(){
    
    try {
         const token = localStorage.getItem('token')
         const response = await axios.get('http://localhost:3000/me', { headers: {Authorization: token}})

         const div = document.createElement('div')
         div.innerHTML = '<p>User Information</p><ul id="userinfo"></ul>'
         document.body.append(div)

         const liUsername = document.createElement('li')
         liUsername.innerText = response.data.username 

        const liPass = document.createElement('li')
        liPass.innerText = response.data.password

        const logoutButt = document.createElement('button')
        logoutButt.innerText = 'Logout'
        logoutButt.addEventListener('click', async function(){
            localStorage.removeItem('token')
            div.innerHTML = ''
            })

        document.getElementById('userinfo').append(liUsername,liPass)
        div.after(logoutDiv)
        logoutDiv.appendChild(logoutButt)
    }
     catch (error) {
        localStorage.removeItem('token')
    }
   
}

if(localStorage.getItem('token')){
    getUserInformation()
}

