
const DEFAULT_FIRST_NUM = 0;
const DEFAULT_SECOND_NUM = '';
const DEFAULT_OPERATOR = '';
const DEFAULT_OPERATORS_USED = 0;
const DEFAULT_EQUALS_PRESSED = false;
const DEFAULT_SOL = 0;


let btns = document.querySelectorAll('.btn');
let numBtns = document.querySelectorAll('.num-btn');
let deleteBtns = document.querySelectorAll('.delete-btn');
let operatorBtns = document.querySelectorAll('.operator-btn');
let equalsBtn = document.querySelector('#equal');

let displayCalc = document.querySelector('#calculation');
let displaySol = document.querySelector('#sol');


let firstOperand = document.querySelector('#first-num');
let secondOperand;
let operator;
let operatorsUsed = DEFAULT_OPERATORS_USED;
let equalsPressed = DEFAULT_EQUALS_PRESSED;

let operators =['/','x','-','+'];


function loadCalculator(){
    displaySol.textContent = DEFAULT_SOL
    firstOperand.textContent = DEFAULT_FIRST_NUM
    asignBtns();
}

function asignBtns(){
    btns=Array.from(btns);
    btns.forEach(btn => {
        btn.addEventListener('click',getClickedBtn);
    });
}

function getClickedBtn(){

        reloadDisplayCalc(this.textContent);

}

function reloadDisplayCalc(input){
    if(input === '='){
        calculateResult();
    }
    if(!operators.includes(input) && operatorsUsed < 1){
        if(firstOperand.textContent == 0 && input === '.' || firstOperand.textContent != 0){
            firstOperand.textContent = firstOperand.textContent + input;
        }
        else{
            firstOperand.textContent = input;
        }
    }
    else if(operatorsUsed === 1){
        if(operators.includes(input) && equalsPressed === true){
            firstOperand.textContent = displaySol.textContent;
            secondOperand.textContent = DEFAULT_SECOND_NUM;
            operator.textContent = input;
            resetCounts();
            operatorsUsed++;
        }
        else if(!operators.includes(input) && equalsPressed === true && input !== '='){
            firstOperand.textContent = input;
            secondOperand.textContent = DEFAULT_SECOND_NUM;
            operator.textContent = DEFAULT_OPERATOR;
            displaySol.textContent = DEFAULT_SOL;
            resetCounts();
        }
        else if(!operators.includes(input) && equalsPressed === false){
            if(document.querySelector('#second-num')){
                secondOperand.textContent = secondOperand.textContent + input;
            }else{
                createSecondNum(input);
            }
        }
    }
    else if(operatorsUsed ===0 && operators.includes(input)){ 
        if(document.querySelector('#operator')){
            operator.textContent = input;
            operatorsUsed++;
        }
        else{
        createOperator(input);
        }
    }
}

function calculateResult(){
    if(equalsPressed === false){
        displaySol.textContent = operate(operator.textContent,firstOperand.textContent,secondOperand.textContent);
        equalsPressed = true;
    }
    else if(equalsPressed === true){
        firstOperand.textContent = displaySol.textContent;
        displaySol.textContent = operate(operator.textContent,firstOperand.textContent,secondOperand.textContent);
    }
}

function createOperator(newOperator){
    operator=document.createElement('span');
    operator.id ='operator';
    operator.textContent = newOperator;
    displayCalc.appendChild(operator);
    operatorsUsed++;
}

function createSecondNum(newNum){
    secondOperand=document.createElement('span');
            secondOperand.id = 'second-num';
            secondOperand.textContent = newNum;
            displayCalc.appendChild(secondOperand);
}

function resetCounts(){
    operatorsUsed = DEFAULT_OPERATORS_USED;
    equalsPressed = DEFAULT_EQUALS_PRESSED;
}

function add(a,b){
 return a + b;
}

function substract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a/ b;
}

function operate(usedOperator,a,b){
    a=parseInt(a);
    b=parseInt(b);
    
    if(usedOperator ==='+'){
       return add(a,b);
    }
    else if(usedOperator ==='-'){
        return substract(a,b);
    }
    else if(usedOperator ==='x'){
        return multiply(a,b);
    }
    else if(usedOperator ==='/'){
        return divide(a,b);
    }
}

loadCalculator();