/////////////
//Constants//
////////////

const DEFAULT_FIRST_NUM = 0;
const DEFAULT_SECOND_NUM = '';
const DEFAULT_OPERATOR = '';
const DEFAULT_OPERATOR_USED = false;
const DEFAULT_DOT_USED = false;
const DEFAULT_EQUALS_PRESSED = false;
const DEFAULT_SOL = 0;

/////////////
//Variables//
////////////

let btns = document.querySelectorAll('.btn');
let numBtns = document.querySelectorAll('.num-btn');
let deleteBtns = document.querySelectorAll('.delete-btn');
let operatorBtns = document.querySelectorAll('.operator-btn');
let equalsBtn = document.querySelector('#equal');

let displayCalc = document.querySelector('#calculation');
let displaySol = document.querySelector('#sol');

let para
let para2
let para3

let firstOperand = document.querySelector('#first-num');
let secondOperand = '';
let operator = '';
let operatorUsed = DEFAULT_OPERATOR_USED;
let equalsPressed = DEFAULT_EQUALS_PRESSED;
let numPressed = false;
let dotUsed = DEFAULT_DOT_USED;

let operators =['/','x','-','+'];

///////////////////
//funky functions//
//////////////////

function loadCalculator(){
    displaySol.textContent = DEFAULT_SOL
    firstOperand.textContent = DEFAULT_FIRST_NUM
    asignBtns();
    createSecondNum('');
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
    else if(input === 'AC'){
        resetAll();
    }
    else if(input ==='C'){
        deleteLastChar();
    }
    else if(input === '%'){
        convertToPercent();
    }
    else if(!operators.includes(input) && operatorUsed === false){
        addToFirstNum(input);
    }
    else if(operators.includes(input) && operatorUsed === false){ 
        if(numPressed === false){
            firstOperand.textContent = changeSign(input);
        }else{
            changeOperator(input);
        }
    }
    else if(operatorUsed === true){
        if(!operators.includes(input) && equalsPressed === false){
            addToSecondNum(input);
        }
        else if(operators.includes(input) && equalsPressed === false && numPressed === false){
                secondOperand.textContent = changeSign(input);
        }
        else if(operators.includes(input) && equalsPressed === true){
                useOperatorOnSol(input);
        }
        else if(!operators.includes(input) && equalsPressed === true && input !== '='){
            resetAll();
            if(input !== '.'){
                firstOperand.textContent = input;
            }
            else{
                firstOperand.textContent = '0.';
                dotUsed = true;
            }
        }
    }
    splitLines();
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
    if(displaySol.textContent === 'Infinity'){
        displaySol.textContent = 'ERROR';
    }else if(displaySol.textContent === 'NaN'){
        displaySol.textContent = firstOperand.textContent;
    }
    if(operator === ''){
        equalsPressed = false;
    }
}

function splitLines(){
    if((firstOperand.textContent.length > 2 || secondOperand.textContent.length > 2 )
    && firstOperand.parentNode.id === document.getElementById('calculation').id && operator !== ''){
        para=displayCalc.insertBefore(document.createElement('p'),operator);
        para2 =displayCalc.insertBefore(document.createElement('p'),operator.nextSibling);
        para.appendChild(firstOperand);
        para2.appendChild(operator);
    }
    else if(document.querySelector('#second-num') && para3 !== undefined){
        para3 =displayCalc.appendChild(document.createElement('p'));
        para3.appendChild(secondOperand);
    }
}

///////////////////////////
//Create or add-functions//
//////////////////////////

function createOperator(newOperator){
    operator=document.createElement('span');
    operator.id ='operator';
    operator.textContent = newOperator;
    displayCalc.insertBefore(operator, secondOperand);
    operatorUsed = true;
}

function createSecondNum(newNum){
    secondOperand=document.createElement('span');
    secondOperand.id = 'second-num';
    secondOperand.textContent = newNum;
    displayCalc.appendChild(secondOperand);
}

function addToFirstNum(toAdd){
        if(firstOperand.textContent == 0 && toAdd === '.' || firstOperand.textContent !== '0'){
            addDot(toAdd);
        }
        else if(firstOperand.textContent === '0.'){
            firstOperand.textContent = firstOperand.textContent + toAdd;
        }
        else if(firstOperand.textContent === '-0'){
            firstOperand.textContent = '-'+toAdd; 
        }
        else{
            firstOperand.textContent = toAdd;
        }
        numPressed = true;
}

function addToSecondNum(toAdd){
    if(document.querySelector('#second-num')){
        if(toAdd === '.'){
            if(secondOperand.textContent === '' || dotUsed === true){
                return
            }
            else{
                secondOperand.textContent = secondOperand.textContent + toAdd;
                dotUsed = true;
            }
        }else{
            secondOperand.textContent = secondOperand.textContent + toAdd;
        }
    }
    else{
        if(toAdd !== '.'){
            createSecondNum(toAdd);
        }
    }
    splitLines();
    numPressed = true;
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

//////////////////////
//operator functions//
/////////////////////

function changeOperator(newOperator){
    if(document.querySelector('#operator')){
        operator.textContent = newOperator;
        operatorUsed = true;
        dotUsed = false;
        numPressed = false;
    }
    else{
    createOperator(newOperator);
    dotUsed = false;
    numPressed = false;
    }
    splitLines();
}

function useOperatorOnSol(operatorForSol){
    firstOperand.textContent = displaySol.textContent;
    secondOperand.textContent = DEFAULT_SECOND_NUM;
    operator.textContent = operatorForSol;
    resetCounts();
    operatorUsed =true;
}

////////////////////////////////
// Reset or Delete-Functions //
//////////////////////////////

function deleteLastChar(){
    if(equalsPressed === true){
        equalsPressed = false;
    }
    if(document.querySelector('#second-num') && secondOperand.textContent !== ''){
        secondOperand.textContent = secondOperand.textContent.slice(0, secondOperand.textContent.length -1);
        if(secondOperand.textContent === ''){
            numPressed = false;
        }
    }
    else if(document.querySelector('#operator') && operator.textContent !== ''){
        operator.textContent = '';
        operatorUsed = false;
    }
    else if(firstOperand !== ''){
        firstOperand.textContent = firstOperand.textContent.slice(0, firstOperand.textContent.length -1);
        if(firstOperand.textContent.length === 0){
            firstOperand.textContent = 0;
        }
    }
    if(firstOperand.textContent.length <= 2){
        displayCalc.appendChild(firstOperand);
        if(operator !== ''){
            displayCalc.appendChild(operator);
        }
        displayCalc.appendChild(secondOperand);
        deletePara(para);
        deletePara(para2);
        deletePara(para3);
    }
}

function deletePara(para){
    if(para !== undefined){
        para.remove();
    }
}

function resetCounts(){
    operatorUsed = DEFAULT_OPERATOR_USED;
    equalsPressed = DEFAULT_EQUALS_PRESSED;
    dotUsed = DEFAULT_DOT_USED;
    numPressed = false;
}

function resetAll(){
    operatorUsed = DEFAULT_OPERATOR_USED;
    equalsPressed = DEFAULT_EQUALS_PRESSED;
    dotUsed = DEFAULT_DOT_USED;
    numPressed = false;
    firstOperand.textContent = DEFAULT_FIRST_NUM;
    if(document.querySelector('#operator')){
        operator.textContent = DEFAULT_OPERATOR;
    }
    if(document.querySelector('#second-num')){
        secondOperand.textContent = DEFAULT_SECOND_NUM;
    }
    displaySol.textContent = DEFAULT_SOL;
    displayCalc.appendChild(firstOperand);
    if(operator !== ''){
        displayCalc.appendChild(operator);
    }
    displayCalc.appendChild(secondOperand);
    deletePara(para);
    deletePara(para2);
    deletePara(para3);
}

///////////////////
//Math-Functions//
/////////////////

function changeSign(num){
    if(num === '-'){
        return '-';
    }else{
        return '';
    }
}

function round(float){
    let decimalPlacesCounter=0;
    let pointPosition ='';
    float=String(float);
    for(let i=1;float.charAt(float.length -i);i++){
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
        return float;
    }
}

function convertToPercent(num){
    if(secondOperand === '' || secondOperand.textContent === ''){
        firstOperand.textContent = firstOperand.textContent /100;
    }else if(equalsPressed === false){
        secondOperand.textContent = secondOperand.textContent / 100;
    }
    else{
        displaySol.textContent = displaySol.textContent /100;
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
    }else{
        return a;
    }
}

loadCalculator();