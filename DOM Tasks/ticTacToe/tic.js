const board = document.getElementById('board')
const currStat = document.getElementById('status')
const resetButt = document.getElementById('resetBtn')

let grid = ["","","","","","","","",""]
let turn = 'X'
let winnerDecided = false
let totalInsert = 0

function checkWinner(player){
    if(grid[0]==player && grid[1] ==player && grid[2]==player)
        return true
    else if(grid[3]==player && grid[4] ==player && grid[5]==player)
        return true
    else if(grid[6]==player && grid[7] ==player && grid[8]==player)
        return true
    else if(grid[0]==player && grid[3] ==player && grid[6]==player)
        return true
   else if(grid[1]==player && grid[4] ==player && grid[7]==player)
        return true
   else if(grid[2]==player && grid[5] ==player && grid[8]==player)
        return true
    else if(grid[2]==player && grid[4] ==player && grid[6]==player)
        return true
    else if(grid[0]==player && grid[4] ==player && grid[8]==player)
        return true
    else
        return false
}

board.addEventListener('click', (e) => {

    if(winnerDecided || totalInsert == 9 || grid[e.target.id]!= ""){
        return
    }
    

    const box = e.target
    console.log(box)
    box.textContent = turn

    const index = box.id
    grid[index] = turn
    totalInsert++

    console.log([...grid], turn, checkWinner(turn));

    if(checkWinner(turn)){
        currStat.textContent = `Player ${turn} won the game`
        winnerDecided = true
        return
        
    }

    if (totalInsert === 9) {
    currStat.textContent = "Game is drawn";
    return;
}


    if(turn == 'X'){
        turn = 'O'
    }
    else{
        turn = 'X'
    }

    currStat.textContent = `Player ${turn}'s Turn`
    
})

resetButt.addEventListener('click', () => {
    
    const boxes = board.querySelectorAll('button')

    for(let i = 0; i < boxes.length; i++){
        boxes[i].textContent = ""
    }

    currStat.textContent = "Player X's turn"
    grid = ["","","","","","","","",""]
    winnerDecided = false
    totalInsert = 0


})

// another implementation of resetButt using foreach

// resetButt.addEventListener('click', (e) => {
//     board.querySelectorAll('button').forEach(
//         (boxes) => {
//             boxes.textContent = ""
//         }
//     )
// })