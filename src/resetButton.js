import {GrabDOMElements} from '/src/linkDOMElem.js';

export class ResetButton extends GrabDOMElements {

    element = this.grabDOMElem('data-button-reset');

    changeFace(face){
        
        this.element.querySelector('use').setAttribute('href',`/icons/spriteLvL.svg#${face}`)
    }
}