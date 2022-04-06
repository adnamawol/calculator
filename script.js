function addition (...args) {
    let addNum = args.reduce( 
        (prevVal, currentVal) => prevVal + currentVal, 0)
    return addNum;
}

//might have to edit to take in multiple numbers?
function subtraction (num1,num2) {
    return(num1-num2);
}

function multiplication (...args) {
    let multiplyNum = args.reduce( (prevVal, currentVal) => prevVal * currentVal, 1 )
    return(multiplyNum);
}

//might have to edit to take in multiple numbers?
function division (num1,num2) {
    return(num1/num2)
}

function operate (num1,num2,operator) {
    if (operator === 'plus') {
        return(addition(num1,num2));
    } else if (operator === 'minus') {
        return(subtraction(num1,num2));
    } else if (operator === 'times') {
        return(multiplication(num1,num2));
    } else if (operator === 'divide') {
        return(division(num1,num2));
    }
}

const displayNumBox = document.querySelector('#display-number');
let num1ToCompute = "";
let num2ToCompute = "";
let operator = "";


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
    console.log(evt.target.id)
}

const operatorBtns = document.querySelectorAll('.operator-btn');
operatorBtns.forEach( (operatorBtn) => operatorBtn.addEventListener('click', (evt) => displayAndStoreOperator(evt)))

const equalBtn = document.querySelector('#equals')
equalBtn.addEventListener('click', () => {
    displayNumBox.textContent="";
    let num1FloatToCompute = parseFloat(num1ToCompute);
    let num2FloatToCompute = parseFloat(num2ToCompute);
    
    if (operator === 'divide' && num2FloatToCompute === 0) {
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
//equalBtn.addEventListener('click', )


//clear btn
const clearBtn = document.querySelector('#clear')
clearBtn.addEventListener('click', () => {
    displayNumBox.textContent = " ";
    num1ToCompute = "";
    num2ToCompute = "";
    operator = "";
})
