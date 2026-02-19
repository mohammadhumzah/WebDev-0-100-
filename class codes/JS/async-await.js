// Just syntactic sugar at the end of the day under the hood its just a promise that looks synchronous

function setTimeoutPromisified(duration){
    return new Promise((resolve) => {
        setTimeout(resolve,duration)
    })
}

async function solve() {
    await setTimeoutPromisified(1000)
    console.log('Hi')
    await setTimeoutPromisified(3000)
    console.log('hello')
    await setTimeoutPromisified(5000)
    console.log('hello thr')
}

solve()


// UNDER THE HOOD

async function solve() {
    setTimeoutPromisified(1000)
    new Promise((resolve) => {
        console.log('hi')
    })
    // and so on
}