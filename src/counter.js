import {GrabDOMElements} from '/src/linkDOMElem.js';

export class Counter extends GrabDOMElements {
    value = null;
    #element = null;

    init(){
        this.#element =this.grabDOMElem('data-timeCounter');
        
    }

   setValue(value){
       this.value = value;
       this.#updateValue();
   }
increment(){
    this.value++
    this.#updateValue();
}
decrement(){
    this.value--
    this.#updateValue();
}


   #updateValue(){
       this.#element.textContent = this.value;
   }
}