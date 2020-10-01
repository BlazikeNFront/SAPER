import {GrabDOMElements} from '/src/linkDOMElem.js'

export class Timer extends GrabDOMElements {

    
    numberOfSec = 0;
    maxTime = 999;
    #element = null;
    #interval = null;

   startTimer(){
       
        this.#element = this.grabDOMElem(`data-bombCounter`)
        this.#interval = setInterval(()=>this.#updateTimer(),1000)
    }
    stopTimer(){
         clearInterval(this.#interval)
    }

    resetTimer(){
        this.numberOfSec = 0;
        
        this.#setTimerValue(this.numberOfSec);
        this.stopTimer();
        this.startTimer();
    }

    #updateTimer(){
        this.numberOfSec++;
        this.numberOfSec <= this.maxTime ? this.#setTimerValue(this.numberOfSec) : this.stopTimer();
        
    }
 
    #setTimerValue(val){
        this.#element = this.grabDOMElem(`data-bombCounter`);
        this.#element.innerText = val;
    }
 

}
