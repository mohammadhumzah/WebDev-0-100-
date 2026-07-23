function addtwotrays(tray1,tray2){
       console.log(tray1 + tray2)
}

addtwotrays(2,2)






let person = { name: "Ali", age: 20 };

for (let key in person) {
    console.log(key, person[key]);
}


function checkResult(marks){
    if (marks > 40){
        return "Pass"
    }
    else{
        return "Fail"
    }
}

console.log(checkResult(13))

function findLarger(a,b){
    if(a>b){
        return a
    }
    else{
        return b
    }
}
console.log(findLarger(3,7))




function login(username,password){
    if (username === "" || password === ""){
        return "Invalid Input"
    }
    else if(username === "Admin" && password === "1234"){
        return "Login Successful"
    }
    else{
        return "Wrong Credentials"
    }
}

console.log(login())



function calculator(a,b, operator){
    if (operator === "+"){
        return a+b
    }
    else if (operator === "-"){
        return a-b
    }
    else{
        return a/b
    }

}

console.log(calculator(1,2,"+"))