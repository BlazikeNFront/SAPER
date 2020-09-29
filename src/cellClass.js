import {GrabDOMElements} from '/src/linkDOMElem.js'
export class Cell extends GrabDOMElements  {
    constructor(x,y) {
        super();
        this.x = x ;
        this.y = y ;
        this.value = null;
        this.isMine = false;
        this.isRevaled = false;
        this.isFlagged = false;
        this.selector = `[data-x ='${this.x}'][data-y='${this.y}']`;
        this.element = null;
    }

    createElement() {
        const item = `<div class="cell border-concave" data-cell data-x="${this.x}" data-y="${this.y}"></div>`  
        return item;


}

 revealCell(){
     this.isRevaled = true;
     this.element.classList.remove('border-concave')
     this.element.classList.add('border--revealed')
 }


 toggleFlag(){
     this.isFlagged = !this.isFlagged;
     this.element.classList.toggle('cell--is-flag')
 }




}