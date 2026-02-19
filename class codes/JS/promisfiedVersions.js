// SetTimeout Promisified

function setTimeoutPromisified(duration) {
    return new Promise((resolve,reject)=> {
        setTimeout(resolve,duration)
    })
}


setTimeoutPromisified(3000).then(function main() {
    console.log('Hello thr')
})


// Fileread Promisified

const { error } = require('console')
const fs = require ('fs')
const { url } = require('inspector')

function readTheFileAsync(){
   return new Promise ((resolve, reject) => {

        fs.readFile('a.txt', 'utf-8', (error, data) => {
            if(!error){
                resolve(data)
            }
            else{
                reject(error)
            }
        })

   })
}

readTheFileAsync('a.txt').then((data) => console.log(data)).catch((error) => console.log(error))

// Fetch Promisified

function fetchPromisified () {
    return new Promise ((resolve,reject) => {

        fetch(url).then((data) => resolve(data))
        .catch((error) => reject(error))

    })
}

fetchPromisified("https://jsonplaceholder.typicode.com/todos/1")
.then((response) => response.json())
.then((data) => console.log(data))
.catch((error) => console.log(error))



