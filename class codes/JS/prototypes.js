// Polyfill .forEach function
// const arr = [1,2,3,4,5]

// if (!Array.prototype.forEach) {
//     Array.prototype.forEach = function(userfn) {

//         for(let i = 0; i < this.length; i++){
//             userfn(this[i], i)
//         }
//     }
// }

// Polyfill for .map

// if (! Array.prototype.map){
//     Array.prototype.map = function(userfn){

//         const newArray = []
//         for (let i = 0; i < this.length; i++){

//             value = userfn(this[i],i)
//             newArray.push[value]
             
//         }
//         return newArray
//     }
// }

// Polyfill for .filter


if (!Array.prototype.myFilter){
    Array.prototype.myFilter = function(userfn){
        const newArray = []
        
        for (let i = 0; i < this.length; i++){
           
            if (userfn(this[i])){
                newArray.push(this[i])
           }
        }
        return newArray
    }
}

arr = [1,2,3,4,5,6]
const nums = arr.myFilter(n => n %2 === 0)
console.log(nums)