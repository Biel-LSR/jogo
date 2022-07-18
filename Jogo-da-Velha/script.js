const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector('[data-board]');
const winMessageTextElement = document.querySelector('[data-win-text]');
const winMessage = document.querySelector('[data-win]');

let isCircleTurn;

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

];

const startGame = () => {
    for (const cell of cellElements) {
        cell.addEventListener("click", handleClick, {once: true})
    }
    isCircleTurn = false;

    board.classList.add("x")
    
};

const endGame = (isDraw) => {
    if(isDraw) {
        winMessageTextElement.innerText = 'Empate!'
    } else {
        winMessageTextElement.innerText = isCircleTurn ? 'Círculo Venceu!' : 'X Venceu!'
    }

    winMessage.classList.add('show-win-text')
}

const checkForWin = (currentPlayer) => {
    return winCombinations.some(combination =>{
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer)
        }) 
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd)
};
const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    board.classList.remove("c")
    board.classList.remove("x")

    if (isCircleTurn) {
        board.classList.add("c")
    } else {
        board.classList.add("x")
    }

};

const handleClick = (e) => {
    // Colocar a marca (X ou Círculo)
    const cell = e.target;
    const classToAdd = isCircleTurn ? "c" : "x";
    placeMark(cell, classToAdd)
    // Verificar por vitória
    const isWin = checkForWin(classToAdd);
    if (isWin){
        endGame(false)
    }
    // Verificar por empate 
    // Mudar o símbolo

    swapTurns();
};


startGame();