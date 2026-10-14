for (var i = 0; i < 3; i++) {
    console.log("Scheduling with i =", i)
    var x = i
    setTimeout(() => {
        console.log("Running Callback, i =", i)
    }, 10000)
}

for (let i = 0; i <3; i++) {
    console.log("SCHEDULING WITH I=", i)
    setTimeout(() => {
        console.log("Runnig callback, i=", i)
        
    }, 10000);
}

for (let i = 0; i < 3; i++) {
  console.log("start of iteration, i =", i);
  i = i + 10; // mutate i inside the loop body
  console.log("after mutation, i =", i);
}