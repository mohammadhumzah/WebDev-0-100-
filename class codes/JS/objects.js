// const person = {
//     first : "humzah",
//     last: "nobody",
//     hobbies : ["Coding", "Walks"], 
//     address: {
//         hno: 1,
//         area: "zakura"
//     }
// }

// console.log(person.address.area)

const teas = {
    name: "Lipton",
    "tea type": "sweet",
    caffeine : 0
}
console.log(teas.name);
// used in case thr is space in key name
console.log(teas["tea type"]);

teas.origin = "China"
teas["cups"] = 2
console.log(teas)

delete teas["tea type"]
console.log(teas)

for (let key in teas){
    console.log(key)
}
