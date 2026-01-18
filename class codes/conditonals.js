// Data Types & Processing

// let guestNumber = 4;


// if(guestNumber <= 2){
//     console.log("Order Small")
// }
// else if(2 < guestNumber <= 5) {
//     console.log("Order Medium")
// }
// else{
//     console.log("order Larger")
// }


let guests = 5
let pizzasize

if (guests<=2){
    pizzasize = "small"
}
else if (guests <= 5){
    pizzasize = "medium"
}
else{
    pizzasize = "large"
}

console.log(pizzasize)