function addition (...args) {
    let addNum = args.reduce( 
        (prevVal, currentVal) => prevVal + currentVal, 0)
    return addNum;
}

function subtraction (num1,num2) {
    return(num1-num2);
}

function multiplication (...args) {
    let multiplyNum = args.reduce( (prevVal, currentVal) => prevVal * currentVal, 1 )
    return(multiplyNum);
}

function division (num1,num2) {
    return(num1/num2)
}

function operate (num1,num2,operator) {
    if (operator === "+") {
        return(addition(num1,num2));
    } else if (operator === "-") {
        return(subtraction(num1,num2));
    } else if (operator === "×") {
        return(multiplication(num1,num2));
    } else if (operator === "÷") {
        return(division(num1,num2));
    }
}

const displayNumBox = document.querySelector('#display-number');
let num1ToCompute = "";
let num2ToCompute = "";
let operator = "";

//evaluating only one pair of number at any one time
function evalAPairOfNum (evt) { 
    if (operator.length >= 2) { 
    displayNumBox.textContent="";
    let num1FloatToCompute = parseFloat(num1ToCompute);
    let num2FloatToCompute = parseFloat(num2ToCompute);
        
    if (operator.slice(0,1) === '÷' && num2FloatToCompute === 0) {
        alert("Orh hor, cannot!")
        num1ToCompute = 0;
        num2ToCompute = 0;
        operator = "";
    } else { 
        let firstOperator = operator.slice(0,1);
        console.log(num1FloatToCompute+", "+num2FloatToCompute+", "+firstOperator)
        let resultNum = operate(num1FloatToCompute,num2FloatToCompute,firstOperator);
        operator = operator.slice(1,2);
        displayNumBox.textContent=`${resultNum}${operator}`;
        num2ToCompute = 0;
        num1ToCompute = resultNum;
        resultNum = 0;
        console.log("I've struck gold!!!!")
    }
    }
}

//one function applied to elements with class 'nums' to display user input numbers
function displayAndStoreNum1 (evt) {
    displayNumBox.textContent += `${evt.target.value}`;
    num1ToCompute += `${evt.target.value}`;
    let num1FloatToCompute = parseFloat(num1ToCompute);
    console.log('Num1: '+num1FloatToCompute);
    return num1FloatToCompute;
}

function displayAndStoreNum2 (evt) {
    displayNumBox.textContent += `${evt.target.value}`;
    num2ToCompute += `${evt.target.value}`;
    let num2FloatToCompute = parseFloat(num2ToCompute);
    console.log('Num2: '+num2FloatToCompute);
    return num2FloatToCompute;
}

const digitBtns = document.querySelectorAll('.nums');
digitBtns.forEach((digitBtn) => digitBtn.addEventListener('click', (evt) => {
    if (operator === "") {
        displayAndStoreNum1(evt);
    } else {
        displayAndStoreNum2(evt)
    }
    }))

function displayAndStoreOperator (evt) {
    displayNumBox.textContent += `${evt.target.value}`;
    operator += `${evt.target.id}`;
}

//WIP
 /* let num1FloatToCompute = parseFloat(num1ToCompute);
    let num2FloatToCompute = parseFloat(num2ToCompute);
    
    if (num2FloatToCompute === 0 && operator === 'divide') {
        alert("Orh hor, cannot!")
        num1ToCompute = 0;
        num2ToCompute = 0;
        operator = "";
    } else { 
        let intermediateNum = operate(num1FloatToCompute,num2FloatToCompute,operator);
        console.log(num1FloatToCompute);
        console.log(num2FloatToCompute);
        console.log("hello"+intermediateNum)
        operator = "";
        num2ToCompute = 0;
        num1ToCompute = intermediateNum;
        intermediateNum = 0;
    }*/

const operatorBtns = document.querySelectorAll('.operator-btn');
operatorBtns.forEach((operatorBtn) => operatorBtn.addEventListener('click', (evt) => displayAndStoreOperator(evt)))
operatorBtns.forEach((operatorBtn) => operatorBtn.addEventListener('click', (evt) => evalAPairOfNum(evt)))

const equalBtn = document.querySelector('#equals')
equalBtn.addEventListener('click', () => {
    displayNumBox.textContent="";
    let num1FloatToCompute = parseFloat(num1ToCompute);
    let num2FloatToCompute = parseFloat(num2ToCompute);
    
    if (operator === '÷' && num2FloatToCompute === 0) {
        alert("Orh hor, cannot!")
        num1ToCompute = 0;
        num2ToCompute = 0;
        operator = "";
    } else { 
        console.log(num1FloatToCompute+", "+num2FloatToCompute+", "+operator)
        let resultNum = operate(num1FloatToCompute,num2FloatToCompute,operator);
        displayNumBox.textContent=resultNum;

        operator = "";
        num2ToCompute = 0;
        num1ToCompute = resultNum;
        resultNum = 0;
    }
} )


//auto-clear btn
const clearBtn = document.querySelector('#auto-clear');
clearBtn.addEventListener('click', () => {
    displayNumBox.textContent = " ";
    num1ToCompute = "";
    num2ToCompute = "";
    operator = "";
})

//delete btn
const delBtn = document.querySelector('#delete');
delBtn.addEventListener('click', () => {
    if (num2ToCompute === 0 && operator !== "") {
        operator = "";
        displayNumBox.textContent = `${num1ToCompute}`;
    } else if (num1ToCompute !== "" && operator === "") {
        let num1Array = [...num1ToCompute]
        num1Array.pop();
        if (num1Array.length === 0) {
            num1ToCompute = 0;
            displayNumBox.textContent = `${parseInt(num1ToCompute)}`
            return;
        }
        num1Array.join('');
        console.log("delete?"+parseInt(num1Array.join('')));
        num1ToCompute = num1Array.join('');
        console.log(num1ToCompute);
        displayNumBox.textContent = `${parseInt(num1Array.join(''))}`;

    } else if (num2ToCompute !== "0" || num2ToCompute !== "") {
        console.log("here i am"+num2ToCompute)
        let num2Array = [...num2ToCompute]
        num2Array.pop();
        if (num2Array.length === 0) {
            num2ToCompute = 0;
            displayNumBox.textContent = `${parseInt(num1ToCompute)}${operator}`
            return;
        }
        num2Array.join('');
        console.log("delete?"+parseInt(num2Array.join('')));
        num2ToCompute = num2Array.join('');
        console.log(num2ToCompute);
        displayNumBox.textContent = `${num1ToCompute}${operator}${parseInt(num2Array.join(''))}`;
    } 
})

//negative and positive numbers
const posNegBtn = document.querySelector('#posneg');
posNegBtn.addEventListener('click', () => {
    if (operator === "") {
       num1ToCompute = 0 - parseFloat(num1ToCompute);
       displayNumBox.textContent = `${num1ToCompute}`;
    } else {
        num2ToCompute = 0 - parseFloat(num2ToCompute);
        displayNumBox.textContent = `${num1ToCompute}${operator}${num2ToCompute}`;
    }
})
