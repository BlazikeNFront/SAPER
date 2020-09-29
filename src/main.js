import {Cell} from '/src/cellClass.js';
import {GrabDOMElements} from '/src/linkDOMElem.js';

class Minesweeper extends GrabDOMElements {
    
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

    #board = this.grabDOMElem('data-gameBoard');
    #cells = [];
    #cellsFlat = null;
    #cellsElements = null;
   

    #newGame(rows = this.#config.easy.row,cols = this.#config.easy.col,mines =this.#config.easy.mines)
     {
    this.#numberOfRows = rows;
    this.#numberOfCols = cols;
    this.#numberOfMines = mines;
    this.#setStyles();
    this.#generateCells();
   this.#renderBoard();
   this.#cellsElements = this.grabDOMElems('data-cell');
   this.#addCellsEventListeners();

    }

    #generateCells(){
        for(let row = 0;row < this.#numberOfRows;row++){
            this.#cells[row] = [];
            for (let col = 0; col < this.#numberOfCols;col++){
                this.#cells[row].push(new Cell(col,row))
            }
        }
        this.#cellsFlat = this.#cells.flat()
       
    }

    #renderBoard (){this.#cellsFlat.forEach(cell => {
        this.#board.insertAdjacentHTML('beforeend', cell.createElement())
        cell.element = document.querySelector(`${cell.selector}`)
        
    });
    
    }


    initializeGame = () => {
       
        
        this.#newGame()
    }

    #setStyles(){
        document.documentElement.style.setProperty('--cells-in-row',this.#numberOfCols)
    }


    #addCellsEventListeners(){
        this.#cellsElements.forEach(cell => {
            cell.addEventListener('click',this.#handleCellClick)
        })
        this.#cellsElements.forEach(cell => {
            cell.addEventListener('contextmenu',this.#handleCellContextMenu)
        })
    }

    #handleCellContextMenu = (e) => {
        
        e.preventDefault();
        const target = e.target;
        const rowIndex = parseInt(target.getAttribute('data-y',10))
        const colIndex = parseInt(target.getAttribute('data-x',10))
       
        const cell = this.#cells[rowIndex][colIndex];
        
        if(cell.isRevaled){return}
        cell.toggleFlag();
        
    }

    #handleCellClick = (e) => {
 const target = e.target;
 const rowIndex = parseInt(target.getAttribute('data-y',10))
 const colIndex = parseInt(target.getAttribute('data-x',10))

 this.#cells[rowIndex][colIndex].revealCell();
    }
   

   
}   


document.addEventListener('DOMContentLoaded',()=> {
   
    const game = new Minesweeper;
    game.initializeGame();
   
    
})