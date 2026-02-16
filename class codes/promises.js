
// console.log('-----Top of file-----')

// const fs = require('fs')

// function readTheFileasync(sendTheFinalValueHere) {
//     console.log('-----readTheFileasync called------')
//     fs.readFile('a.txt', 'utf-8', function(err,data){
//         sendTheFinalValueHere(data)
//     })
// }

// function readFile(fileName) {
//     console.log('-----readFile called-----')
//     return new Promise(readTheFileasync)
// }

// function main(contents){
//     console.log('---main is called-----')
//     console.log(contents)
// }

// readFile().then(main)




class Promise2 {
    constructor(fn) {
        this.fn = fn                        // fn is wait3s
        this.fn( () => {
            this.resolve()                  // waits3s calls resolve, but resolve itself is main so eventually main is called
        })
    }
    then(main) {
        this.resolve = main
    }
}


console.log('--Top of file called--')

function waitfor3s(resolve){
    console.log('---waitfor3s called---')
    setTimeout(resolve,3000)                    // this looks like how we would use callback, thats what we did wrapped callback in a function
}

function setTimeoutPromisified(){
    console.log('--setTimeoutPromisified called--')
    return new Promise(waitfor3s)
}

function main(){
    console.log("main is called")
}

setTimeoutPromisified().then(main) 



// Another way of writing it with help of arrow function:

function setTimeoutPromisified(){
    return new Promise((resolve) => {
        setTimeout(resolve,time)
    })
}

function main(){
    console.log("main is called")
}

setTimeoutPromisified(3000).then(main) 