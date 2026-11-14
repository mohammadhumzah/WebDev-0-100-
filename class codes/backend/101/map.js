// ## Assignment #2 - Create a map functions that takes an array and a transform function as input and returns the transformed array as output


const numb = [2,4,6,12]
function calbackFunc(a){
    return a * 2
}



function map(arr, calbackFunc){
    const transformedArr = []

    for(let i = 0; i < arr.length; i++){
        transformedArr.push(calbackFunc(arr[i]))
    }
    return transformedArr
}


const doublednumb = map(numb,calbackFunc)
console.log(doublednumb)



// Assignment #1 - Create a map functions that takes 2 inputs an array and a transformation callback/function and transform the array into a new one using transformation function


const arr = [2,4,6,12]

const newArr = arr.map(function calbackFunc(i){
   return i + 2
})

console.log(newArr)

// Another way is when we use {} in arrow functions we have to use return

const newArr = arr.map((i) => {
    return i + 2
})

// But when we dont use {} no need to use return

const newArr = arr.map(i => i +2)




