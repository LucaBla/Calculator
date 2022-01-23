
const DEFAULT_FIRST_NUM = 0;
const DEFAULT_SECOND_NUM = '';
const DEFAULT_OPERATOR = '';
const DEFAULT_OPERATOR_USED = false;
const DEFAULT_DOT_USED = false;
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
let operatorUsed = DEFAULT_OPERATOR_USED;
let equalsPressed = DEFAULT_EQUALS_PRESSED;
let dotUsed = DEFAULT_DOT_USED;

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
    if(input === 'AC'){
        resetAll();
    }
    else if(!operators.includes(input) && operatorUsed === false){
        console.log('lol');
        if(firstOperand.textContent == 0 && input === '.' || firstOperand.textContent != 0){
            console.log('lol2');
            addDot(input);
        }
        else if(firstOperand.textContent === '0.'){
            console.log('atze');
            firstOperand.textContent = firstOperand.textContent + input;
        }
        else{
            firstOperand.textContent = input;
        }
    }
    else if(operatorUsed === true){
        if(operators.includes(input) && equalsPressed === true){
            firstOperand.textContent = displaySol.textContent;
            secondOperand.textContent = DEFAULT_SECOND_NUM;
            operator.textContent = input;
            resetCounts();
            operatorUsed =true;
        }
        else if(!operators.includes(input) && equalsPressed === true && input !== '='){
            resetCounts();
            if(input !== '.'){
                firstOperand.textContent = input;
            }
            else{
                firstOperand.textContent = '0.';
                dotUsed = true;
            }
            secondOperand.textContent = DEFAULT_SECOND_NUM;
            operator.textContent = DEFAULT_OPERATOR;
            displaySol.textContent = DEFAULT_SOL;
        }
        else if(!operators.includes(input) && equalsPressed === false){
            if(document.querySelector('#second-num')){
                if(input === '.'){
                    if(secondOperand.textContent === '' || dotUsed === true){
                        return
                    }
                    else{
                        secondOperand.textContent = secondOperand.textContent + input;
                        dotUsed = true;
                    }
                }else{
                    secondOperand.textContent = secondOperand.textContent + input;
                }
            }
            else{
                if(input !== '.'){
                    createSecondNum(input);
                }
            }
        }
    }
    else if(operatorUsed === false && operators.includes(input)){ 
        if(document.querySelector('#operator')){
            operator.textContent = input;
            operatorUsed = true;
            dotUsed = false;
        }
        else{
        createOperator(input);
        dotUsed = false;
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
    operatorUsed = true;
}

function createSecondNum(newNum){
    secondOperand=document.createElement('span');
    secondOperand.id = 'second-num';
    secondOperand.textContent = newNum;
    displayCalc.appendChild(secondOperand);
}

function addDot(input){
    if(dotUsed === false && input === '.'){
        firstOperand.textContent = firstOperand.textContent + input;
        dotUsed = true;
    }
    else if(dotUsed === true && input !== '.' || dotUsed === false && input !== '.'){
        firstOperand.textContent = firstOperand.textContent + input;
    }
}

function resetCounts(){
    operatorUsed = DEFAULT_OPERATOR_USED;
    equalsPressed = DEFAULT_EQUALS_PRESSED;
    dotUsed = DEFAULT_DOT_USED;
}

function resetAll(){
    operatorUsed = DEFAULT_OPERATOR_USED;
    equalsPressed = DEFAULT_EQUALS_PRESSED;
    dotUsed = DEFAULT_DOT_USED;
    firstOperand.textContent = DEFAULT_FIRST_NUM;
    if(document.querySelector('#operator')){
        operator.textContent = DEFAULT_OPERATOR;
    }
    if(document.querySelector('#second-num')){
        secondOperand.textContent = DEFAULT_SECOND_NUM;
    }
    displaySol.textContent = DEFAULT_SOL;
}

function round(float){
    console.log('float ist ' + float);
    let decimalPlacesCounter=0;
    let pointPosition ='';
    float=String(float);
    for(let i=1;float.charAt(float.length -i);i++){
        console.log('floatie is ' + float.slice(-i));
        if(float.slice(-i) === '0'){
            decimalPlacesCounter++;
        }
        else if(float[i] === '.'){
            pointPosition = i;
            break;
        }
    }
    let floatLength = float.length
    float = parseFloat(float);
    if(decimalPlacesCounter !== 0 && pointPosition !== ''){
        return float.toPrecision(floatLength-decimalPlacesCounter);
    }else if(floatLength > pointPosition + 2 && pointPosition !== ''){
        return float.toPrecision(pointPosition +2);
    }else if(pointPosition !== ''){
        return float.toPrecision(floatLength-1);
    }
    else{
        console.log('za');
        return float;
    }
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
    a=parseFloat(a);
    b=parseFloat(b);

    console.log(a)
    console.log(b)
    
    if(usedOperator ==='+'){
       return round(add(a,b));
    }
    else if(usedOperator ==='-'){
        return round(substract(a,b));
    }
    else if(usedOperator ==='x'){
        return round(multiply(a,b));
    }
    else if(usedOperator ==='/'){
        return round(divide(a,b));
    }
}

loadCalculator();