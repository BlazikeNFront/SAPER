export  class GrabDOMElements  {

    grabDOMElem = (attribute) =>{ return document.querySelector(`[${attribute}]`)}

    grabDOMElems = (attribute) => { return document.querySelectorAll(`[${attribute}]`)}
}