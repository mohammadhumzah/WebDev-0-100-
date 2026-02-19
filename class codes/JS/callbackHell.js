// Callback hell

// log hi after 1s then hello after 3s of loggin hi and hello thr after 5 sec of logging hello

setTimeout( (function() {
    console.log('Hi')

    setTimeout( (function() {
        console.log('hello')

        setTimeout( (function() {
            console.log('Hello thr')
        }), 5000)
    }), 3000)
}),1000)


//Alt solution doesnt look ugly 

function step3() {
    console.log('hello thr')
}


function step2(){
    console.log('hello')
    setTimeout(step3, 5000)
}


function step1(){
    console.log('hi')
    setTimeout(step2, 3000)
}


setTimeout(step1, 1000)


// Promise Chaining


function setTimeoutPromisified(duration){
    return new Promise(function (resolve) {
        setTimeout(resolve, duration)
    })
}


setTimeoutPromisified(1000).then(function() {
    console.log('hi')
    return setTimeoutPromisified(3000)      // returns a promise jo upar likha hai 
}).then(function (){
    console.log('hello')
    return setTimeoutPromisfied(5000)
}).then(function (){
    console.log('hello thr')
})