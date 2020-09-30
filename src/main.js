import {Cell} from '/src/cellClass.js';
import {GrabDOMElements} from '/src/linkDOMElem.js';
import {Counter} from '/src/counter.js';
import {Timer} from '/src/Timer.js';

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

    #counter = new Counter();
   #timer = new Timer();
    #numberOfRows = null;
    #numberOfCols = null;
    #numberOfMines = null;
    #isGameFinished = false;
    #board = this.grabDOMElem('data-gameBoard');
    #cells = [];
    #cellsFlat = null;
    #cellsElements = null;
   

    #newGame(rows = this.#config.easy.row,cols = this.#config.easy.col,mines =this.#config.easy.mines)
     {
    this.#numberOfRows = rows;
    this.#numberOfCols = cols;
    this.#numberOfMines = mines;

    this.#counter.setValue(this.#numberOfMines);
    this.#timer.startTimer();
    this.#setStyles();
    this.#generateCells();
   this.#renderBoard();
   this.#cellsElements = this.grabDOMElems('data-cell');
   this.#addCellsEventListeners();
   this.#placeMinesInCells();
   


    }


    #endGame(isWin){
        this.#isGameFinished = true;
        this.#timer.stopTimer();
        if(!isWin){
            this.#revealMines();
        }
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
       
        this.#counter.init();
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

    #revealMines(){

   this.#cells.flat().filter(cell => cell.isMine).forEach(cell =>cell.revealCell())
    }




    #handleCellContextMenu = (e) => {
        
        e.preventDefault();
        const target = e.target;
        const rowIndex = parseInt(target.getAttribute('data-y',10))
        const colIndex = parseInt(target.getAttribute('data-x',10))
       
        const cell = this.#cells[rowIndex][colIndex];
        
        if(cell.isRevaled || this.#isGameFinished){return}
        

        if(cell.isFlagged){
            this.#counter.increment();
            cell.toggleFlag();
            return
        }

        if(!!this.#counter.value){
            this.#counter.decrement();
        }
        cell.toggleFlag();
    }

    #handleCellClick = (e) => {
 const target = e.target;
 const rowIndex = parseInt(target.getAttribute('data-y',10))
 const colIndex = parseInt(target.getAttribute('data-x',10))

 const cell =this.#cells[rowIndex][colIndex];
 
 this.#clickCell(cell);
    }
   


    #placeMinesInCells(){
        let minesToPlace = this.#numberOfMines;
        
        while(minesToPlace){
            
            const rowIndex = this.#randomInteger(0,this.#numberOfRows-1);
            const colIndex = this.#randomInteger(0,this.#numberOfCols-1);

            const cell = this.#cells[rowIndex][colIndex];
            
            
            if(cell.isMine === false){
                
                cell.isMine = true;
                minesToPlace--
            }
        }
    }

    #clickCell(cell){
        if(this.#isGameFinished || cell.isFlagged){return}
        if(cell.isMine){
            this.#endGame(false)
        }
        this.#setCellValue(cell);
      //  cell.revealCell();
    }

    #randomInteger(min,max){
        return Math.floor(Math.random()*(max-min+1)+min)
    }
    #setCellValue(cell){
        let minesCount = 0;
        for(let rowIndex = Math.max(cell.y - 1,0);rowIndex<=Math.min(cell.y+1,this.#numberOfRows-1);rowIndex++){
            for(let colIndex = Math.max(cell.x - 1,0);colIndex<=Math.min(cell.x+1,this.#numberOfCols-1);colIndex++){
                if(this.#cells[rowIndex][colIndex].isMine){minesCount++}
            }
        }
    cell.value = minesCount;
    cell.revealCell();

        if(!cell.value){
            for(let rowIndex = Math.max(cell.y - 1,0);rowIndex<=Math.min(cell.y+1,this.#numberOfRows-1);rowIndex++){
                for(let colIndex = Math.max(cell.x - 1,0);colIndex<=Math.min(cell.x+1,this.#numberOfCols-1);colIndex++){
                    const cell =this.#cells[rowIndex][colIndex]
                    if(!cell.isRevaled){
                        this.#clickCell(cell);
                    }
                }
        }

    }
    
   
}
}

document.addEventListener('DOMContentLoaded',()=> {
   
    const game = new Minesweeper;
    game.initializeGame();
   
    
})