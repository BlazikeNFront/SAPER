import {Cell} from '/src/cellClass.js'


class Minesweeper {
    #config = {
        easy: {
            row:8,
            col:8,
            mines:10,
        },
        medium: {
            row:16,
            col:16,
            mines:40,
        },
        hard: {
            row:16,
            col:30,
            mines:99,
        },
    }

    #numberOfRows = null;
    #numberOfCols = null;
    #numberOfMines = null;

    initializeGame = () => {
        this.#newGame()
    }

    #newGame(rows = this.#config.easy.row,cols = this.#config.easy.col,mines =this.#config.easy.mines)
     {
    this.#numberOfRows = rows;
    this.#numberOfCols = cols;
    this.#numberOfMines = mines;

    this.#generateCells();
    }

    #generateCells(){
        for(let i = 0;i < this.#numberOfRows;row++){
            this.#cells[row] = [];
            for (let col = 0; col < this.#numberOfCols;col++){
                this.#cells[row].push(new Cell(col,row))
            }
        }
    }








}   


document.addEventListener('DOMContenLoaded',()=> {
    const game = new Minesweeper;
    game.initializeGame();
})