window.addEventListener('DOMContentLoaded', () => {
    const cells = Array.from(document.querySelectorAll('.cell'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#fourreset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'B';
    let isGameActive = true;
    let j1 = 0;
    let j2 = 0;
    let j3 = 0;
    let j4 = 0;

    const PLAYERB_WON = 'PLAYERB_WON';
    const PLAYERR_WON = 'PLAYERR_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [14, 22, 30, 38],
        [7, 15, 23, 31],
        [15, 23, 31, 39],
        [0, 8, 16, 24],
        [8, 16, 24, 32],
        [16, 24, 32, 40],
        [1, 9, 17, 25],
        [9, 17, 25, 33],
        [17, 25, 33, 41],
        [2, 10, 18, 26],
        [10, 18, 26, 34],
        [3, 11, 19, 27],
        [3, 9, 15, 21],
        [4, 10, 16, 22],
        [10, 16, 22, 28],
        [5, 11, 17, 23],
        [11, 17, 23, 29],
        [17, 23, 29, 35],
        [6, 12, 18, 24],
        [12, 18, 24, 30],
        [18, 24, 30, 36],
        [13, 19, 25, 31],
        [19, 25, 31, 37],
        [20, 26, 32, 38]
    ];

    for (let x = 0; x <= 2; x++) {
         for (let j = 0; j <= 6; j++) {
             j1 = 0+(x*7)+j;
             j2 = 7+(x*7)+j;
             j3 = 14+(x*7)+j;
             j4 = 21+(x*7)+j;
             winningConditions.push([j1,j2,j3,j4]);
        }
    }
    for (let x = 0; x <= 3; x++) {
         for (let j = 0; j <= 5; j++) {
             j1 = 0+x+(j*7);
             j2 = 1+x+(j*7);
             j3 = 2+x+(j*7);
             j4 = 3+x+(j*7);
             winningConditions.push([j1,j2,j3,j4]);
        }
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= (24+21+24-2); i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            const d = board[winCondition[3]];
            if (a === '' || b === '' || c === '' || d ==='') {
                continue;
            }
            if (a === b && b === c && c === d) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'B' ? PLAYERB_WON : PLAYERR_WON);
            isGameActive = false;
            return;
        }

        if (!board.includes(''))
            announce(TIE);
    }

    const announce = (type) => {
        switch (type) {
            case PLAYERR_WON:
                announcer.innerHTML = 'Player <span class="playerR">R</span> Won';
                break;
            case PLAYERB_WON:
                announcer.innerHTML = 'Player <span class="playerB">B</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (cell) => {
        if (cell.classList != "cell valid") {
            return false;
        }

        return true;
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'B' ? 'R' : 'B';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const updateCells = (index) => {
        let indexskip = index-7; 
        cells[indexskip].classList.remove("empty");
        cells[indexskip].classList.add("valid");
    }

    const userAction = (cell, index) => {
        if (isValidAction(cell) && isGameActive) {
            cell.classList.remove("empty");
            cell.classList.add(currentPlayer === 'B' ? "blue" : "red");
            cell.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
            updateCells(index);
        }
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                 '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'R') {
            changePlayer();
        }

        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('playerB');
            cell.classList.remove('playerR');
            cell.classList.remove('blue');
            cell.classList.remove('red');
            cell.classList.remove('valid');
            cell.classList.add('empty');
        });
        cells[35].classList.add('valid');
        cells[36].classList.add('valid');
        cells[37].classList.add('valid');
        cells[38].classList.add('valid');
        cells[39].classList.add('valid');
        cells[40].classList.add('valid');
        cells[41].classList.add('valid');

        cells[35].classList.remove('empty');
        cells[36].classList.remove('empty');
        cells[37].classList.remove('empty');
        cells[38].classList.remove('empty');
        cells[39].classList.remove('empty');
        cells[40].classList.remove('empty');
        cells[41].classList.remove('empty');
    }

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => userAction(cell, index));
    });

    resetButton.addEventListener('click', resetBoard);
});