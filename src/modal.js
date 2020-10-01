import {GrabDOMElements} from '/src/linkDOMElem.js'

export class Modal extends GrabDOMElements {

    buttonText = ''
    infoText = '';
    element = this.grabDOMElem('data-modal');
    button = this.grabDOMElem('data-modal-button');
    info = this.grabDOMElem('data-modal-info');


    toggleModal = () => {
        this.element.classList.toggle('hide')
    }
    
    setText(){
        this.info.textContent = this.infoText;
        this.button.textContent = this.buttonText;
    }
}