
export class Cell  {
    constructor(x,y) {
        this.x = x ;
        this.y = y ;
        this.value = null;
        this.isMine = false;
        this.isRevaled = false;
        this.isFlagged = false;
        this.selector = `[data-x ='${this.x}'][data-y='${this.y}']`;
        this.element = null;
    }

}