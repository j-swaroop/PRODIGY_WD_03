let boxes = document.querySelectorAll('.box');
let currentPlayerEl = document.getElementById('currentPlayer');
let restartBtn = document.getElementById('btn');

let currentPlayer = 'O';
let isGameOver = false;
let winningPossibilties = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let updatePlayerTurn = () => {
    currentPlayerEl.textContent = `Player ${currentPlayer}'s turn`;
}

let checkForWinner = () => {
    winningPossibilties.forEach((eachPossibility) => {
        let check = eachPossibility.every(index => {
            return boxes[index].innerHTML === currentPlayer;
        })
        
        if (check){
            eachPossibility.map(index => {
                boxes[index].classList.add('winning-boxes')
            })
            isGameOver = true;
            currentPlayerEl.innerHTML = `Game's over ${currentPlayer} wins`;
            [...boxes].map(box => box.classList.remove('box-o'));
            [...boxes].map(box => box.classList.remove('box-x'))
        }
    })
}

let checkForDraw = () => {
    if (![...boxes].some(item => item.innerHTML === '') && !isGameOver){
        isGameOver = true;
        currentPlayerEl.innerHTML = `It's a draw!`;
    }
}


boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (box.textContent !== '' || isGameOver) return
        box.innerHTML = currentPlayer;
        currentPlayer === 'X'? (box.classList.add('box-x')): (box.classList.add('box-o'));
        checkForWinner()
        checkForDraw()

        if (!isGameOver){
            currentPlayer = currentPlayer === 'O' ? 'X': 'O'; 
            updatePlayerTurn()
        }

    })
})


restartBtn.addEventListener('click', () => {
    isGameOver = false;
    currentPlayer = 'O';
    boxes.forEach(box => box.innerHTML = '');
    boxes.forEach(box => box.classList.remove('winning-boxes'));
    currentPlayerEl.innerHTML = `Player O's turn`

})
