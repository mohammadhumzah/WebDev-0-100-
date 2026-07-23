function printchai(){

    console.log("Hello Carol")
}

function bringatombomb(thismany){
    console.log(`Here are your ${thismany} Atom Bombs`)
}


// function addtwo(num1,num2){
//     return num1 + num2
// }

// printchai()         // this works only when console is inside function
// bringatombomb(14)
// console.log(addtwo(2,2))


function greet(){
    const greeting = "hey there"        
}

console.log(greeting)

// This wont work because in js the fn here doesnt have access to the variable outside of the fn block, which is why var was replaced with const,let


// Works in the below two cases because inner functions can read outer variables of their parent function
function greet() {
    let count = 0
    function  hit() {
        count ++
        return count
    }
    return hit
}

const counter = greet()
counter()

// ------------------- //

function outer() {
  let x = 5;              // line 2

  function inner() {       // line 4 (just defining inner, not running it yet)
    console.log(x);
  }

  inner();                 // line 8 — inner is CALLED here
}                           // line 9 — outer finishes here

outer();                   // line 12 — this starts everything



//-------------//

function  outer( {
    let username = "humzah"
    console.log(secret);
    
    function inner1() {
        console.log(username)       // has access to username
        let secret = "my123"
    }

    function inner2() {
        console.log(username)       // has access to username also
        console.log(secret)         // doesnt have access to secret
    }
    inner2()
})
