let teas = ["masala", "ginger", "nun", "lipton", "doade-kahwe"]
console.log(teas.length)

for (let i = 0; i < teas.length; i++){
    console.log(`Tea at index ${i}:${teas[i]}`)
}


let myArray = [1,4,2,5]

function sumfac(nums){
    let total = 0
    for (let i=0; i<nums.length; i++){
       total+=nums[i]
    }
    return total
}

console.log(sumfac(myArray))





teas = ["lipton","nun","kahwe","green"]
const upcase = []

for (let n of teas){
    upcase.push(n.toUpperCase())
}
console.log(upcase)