function printchai(){

    console.log("Hello Carol")
}

function bringatombomb(thismany){
    console.log(`Here are your ${thismany} Atom Bombs`)
}

function addtwo(num1,num2){
    return num1 + num2
}

printchai()         // this works only when console is inside function
bringatombomb(14)
console.log(addtwo(2,2))

let count = 0
function greet(){
    return count          
}

// This wont work because in js the fn here doesnt have access to the variable outside of the fn block, which is why var was replaced with const,let


// But then thr is tiffin concept;

function greet(){
    let count = 0
    function hit(){
        count++
        return count
    }
}

// The function hit should not have had access to count but in js it does, because of tiffin concept. Since they are both part of same parent fn the internal function has access to everything inside of the parent function.

