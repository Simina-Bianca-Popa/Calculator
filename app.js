//calculator Class 
class Calculator{
    constructor (prevOperatonTextElement, currentOperationTextElement) {
        this.prevOperatonTextElement = prevOperatonTextElement
        this.currentOperationTextElement = currentOperationTextElement
        this.clear();

    }
// create functions for all the calculater will do

// all clear function
clear() {
    this.currentOperation = '';
    this.prevOperation = '';
    this.operation = undefined;

}
// delete function, for single number
delete() {
    this.currentOperation = this.currentOperation.toString().slice(0,-1)

}
// click on a number and add it to the display function
appendNumber(number) {
    if (number === '.' && this.currentOperation.includes('.')) return; //  for append only one .
    this.currentOperation = this.currentOperation.toString() + number.toString(); //toString because 1 1 = 11 ;  not 1+1=2

}
// operation function  = + - ÷
chooseOperation(operation) {
    if (this.currentOperation === '') return; //if only operation click return. 
    if (this.prevOperation !== '') { //important to do this before operation so we can use both operantion and = to get results
        this.compute();
    }
    this.operation = operation;
    this.prevOperation = this.currentOperation;
    this.currentOperation = '';
}
// compute the singale value
compute() {
    let computation 
    const previous = parseFloat(this.prevOperation) //parseFloat to convertt to number
    const current = parseFloat(this.currentOperation)
    if (isNaN(previous) || isNaN(current)) return
    switch (this.operation) {
        case '÷': 
            computation = previous / current
            break
        case '*': 
            computation = previous * current
            break
        case '+': 
            computation = previous + current
            break
        case '-': 
            computation = previous - current
            break;
        default:
            returne; 
    }
    this.currentOperation = computation
    this.operation = undefined;
    this.prevOperation = '';
}
// update the value for the output
updateDisplay(){
    this.currentOperationTextElement.innerText= this.currentOperation;
    if (this.operation != null) {
    this.prevOperatonTextElement.innerText= `${this.prevOperation} ${this.operation}`;
    }
        else {
        this.prevOperatonTextElement.innerText = '';
        }
    }
}

//
const numberBtns = document.querySelectorAll('[data-number]');
const operationsBtns = document.querySelectorAll('[data-operartion]');
const equalsBtns = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear ]');
const prevOperatonTextElement = document.querySelector('[data-prev-op]');
const currentOperationTextElement = document.querySelector('[data-current-op]');
const calculator = new Calculator (prevOperatonTextElement, currentOperationTextElement);

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationsBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsBtns.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearBtn.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});