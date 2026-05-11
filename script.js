const screen = document.getElementById("screen");
const expressionDisplay = document.getElementById("expression");

/* =========================
   MODE & THEME
========================= */

const standardBtn = document.getElementById("standardBtn");
const scientificBtn = document.getElementById("scientificBtn");

const scientificMode = document.querySelector(".scientific-mode");
const calculator = document.querySelector(".calculator");

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

/* =========================
   ANGLE MODE
========================= */

const degBtn = document.getElementById("degBtn");
const radBtn = document.getElementById("radBtn");

let angleMode = "DEG";

/* =========================
   HISTORY
========================= */

const historyPanel = document.querySelector(".history-panel");
const historyList = document.querySelector(".history-list");

const clearHistoryButton = document.getElementById("clearHistory");

/* =========================
   BUTTONS
========================= */

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");

const equalButton = document.querySelector(".equal");

const scientificButtons = document.querySelectorAll(".scientific");

/* =========================
   LOAD SAVED THEME
========================= */

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "light"){

    body.classList.add("light-mode");

    themeToggle.textContent = "☀️";

}

/* =========================
   THEME TOGGLE
========================= */

themeToggle.addEventListener("click", () => {

    body.classList.toggle("light-mode");

    if(body.classList.contains("light-mode")){

        themeToggle.textContent = "☀️";

        localStorage.setItem("theme", "light");

    }else{

        themeToggle.textContent = "🌙";

        localStorage.setItem("theme", "dark");

    }

});

/* =========================
   MODE SWITCH
========================= */

scientificBtn.addEventListener("click", () => {

    scientificMode.classList.remove("hidden");

    historyPanel.style.display = "flex";

    scientificBtn.classList.add("active");
    standardBtn.classList.remove("active");

    calculator.classList.add("scientific-layout");

});

standardBtn.addEventListener("click", () => {

    scientificMode.classList.add("hidden");

    historyPanel.style.display = "none";

    standardBtn.classList.add("active");
    scientificBtn.classList.remove("active");

    calculator.classList.remove("scientific-layout");

});

/* =========================
   ANGLE MODE SWITCH
========================= */

degBtn.addEventListener("click", () => {

    angleMode = "DEG";

    degBtn.classList.add("angle-active");
    radBtn.classList.remove("angle-active");

});

radBtn.addEventListener("click", () => {

    angleMode = "RAD";

    radBtn.classList.add("angle-active");
    degBtn.classList.remove("angle-active");

});

/* =========================
   HISTORY FUNCTIONS
========================= */

function saveHistory(){

    const items = [];

    document.querySelectorAll(".history-item").forEach(item => {

        items.push(item.textContent);

    });

    localStorage.setItem(
        "calculatorHistory",
        JSON.stringify(items)
    );

}

function loadHistory(){

    const savedHistory = JSON.parse(
        localStorage.getItem("calculatorHistory")
    );

    if(savedHistory){

        savedHistory.forEach(history => {

            const item = document.createElement("div");

            item.classList.add("history-item");

            item.textContent = history;

            historyList.appendChild(item);

        });

    }

}

function addToHistory(expression, result){

    const item = document.createElement("div");

    item.classList.add("history-item");

    item.textContent = `${expression} = ${result}`;

    historyList.prepend(item);

    saveHistory();

}

/* =========================
   ANGLE CONVERSION
========================= */

function toRadians(value){

    if(angleMode === "DEG"){
        return value * (Math.PI / 180);
    }

    return value;

}

function fromRadians(value){

    if(angleMode === "DEG"){
        return value * (180 / Math.PI);
    }

    return value;

}

/* =========================
   NUMBER BUTTONS
========================= */

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        if(screen.textContent === "0"){
            screen.textContent = "";
        }

        screen.textContent += button.textContent;

        expressionDisplay.textContent += button.textContent;

    });

});

/* =========================
   OPERATOR BUTTONS
========================= */

operatorButtons.forEach(button => {

    button.addEventListener("click", () => {

        const lastChar =
            expressionDisplay.textContent.slice(-1);

        if(
            lastChar === "+" ||
            lastChar === "-" ||
            lastChar === "*" ||
            lastChar === "/" ||
            lastChar === "%"
        ){
            return;
        }

        screen.textContent += button.textContent;

        expressionDisplay.textContent += button.textContent;

    });

});

/* =========================
   CLEAR BUTTON
========================= */

clearButton.addEventListener("click", () => {

    screen.textContent = "0";

    expressionDisplay.textContent = "";

});

/* =========================
   BACKSPACE BUTTON
========================= */

backspaceButton.addEventListener("click", () => {

    screen.textContent =
        screen.textContent.slice(0, -1);

    expressionDisplay.textContent =
        expressionDisplay.textContent.slice(0, -1);

    if(screen.textContent === ""){
        screen.textContent = "0";
    }

});

/* =========================
   CALCULATE
========================= */

function calculate(){

    try{

        const expression =
            expressionDisplay.textContent;

        const result = eval(expression);

        screen.textContent = result;

        addToHistory(expression, result);

    }catch{

        screen.textContent = "Error";

    }

}

/* =========================
   EQUAL BUTTON
========================= */

equalButton.addEventListener("click", () => {

    calculate();

});

/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener("keydown", (event) => {

    const key = event.key;

    if(/[0-9]/.test(key)){

        if(screen.textContent === "0"){
            screen.textContent = "";
        }

        screen.textContent += key;

        expressionDisplay.textContent += key;

    }

    else if(key === "."){

        screen.textContent += key;

        expressionDisplay.textContent += key;

    }

    else if(
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
    ){

        screen.textContent += key;

        expressionDisplay.textContent += key;

    }

    else if(key === "Enter"){

        event.preventDefault();

        calculate();

    }

    else if(key === "Backspace"){

        event.preventDefault();

        screen.textContent =
            screen.textContent.slice(0, -1);

        expressionDisplay.textContent =
            expressionDisplay.textContent.slice(0, -1);

        if(screen.textContent === ""){
            screen.textContent = "0";
        }

    }

    else if(key === "Escape"){

        screen.textContent = "0";

        expressionDisplay.textContent = "";

    }

});

/* =========================
   SCIENTIFIC BUTTONS
========================= */

scientificButtons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent;

        const expression =
            expressionDisplay.textContent;

        try{

            switch(value){

                case "sin":

                    screen.textContent =
                        Math.sin(
                            toRadians(eval(expression))
                        );

                    addToHistory(expression, screen.textContent);

                    break;

                case "cos":

                    screen.textContent =
                        Math.cos(
                            toRadians(eval(expression))
                        );

                    addToHistory(expression, screen.textContent);

                    break;

                case "tan":

                    screen.textContent =
                        Math.tan(
                            toRadians(eval(expression))
                        );

                    addToHistory(expression, screen.textContent);

                    break;

                case "asin":

                    screen.textContent =
                        fromRadians(
                            Math.asin(eval(expression))
                        );

                    addToHistory(expression, screen.textContent);

                    break;

                case "acos":

                    screen.textContent =
                        fromRadians(
                            Math.acos(eval(expression))
                        );

                    addToHistory(expression, screen.textContent);

                    break;

                case "atan":

                    screen.textContent =
                        fromRadians(
                            Math.atan(eval(expression))
                        );

                    addToHistory(expression, screen.textContent);

                    break;

                case "log":

                    screen.textContent =
                        Math.log10(eval(expression));

                    addToHistory(expression, screen.textContent);

                    break;

                case "ln":

                    screen.textContent =
                        Math.log(eval(expression));

                    addToHistory(expression, screen.textContent);

                    break;

                case "π":

                    screen.textContent += Math.PI;
                    expressionDisplay.textContent += Math.PI;

                    break;

                case "e":

                    screen.textContent += Math.E;
                    expressionDisplay.textContent += Math.E;

                    break;

                case "√":

                    screen.textContent =
                        Math.sqrt(eval(expression));

                    addToHistory(expression, screen.textContent);

                    break;

                case "x²":

                    screen.textContent =
                        Math.pow(eval(expression), 2);

                    addToHistory(expression, screen.textContent);

                    break;

                case "x³":

                    screen.textContent =
                        Math.pow(eval(expression), 3);

                    addToHistory(expression, screen.textContent);

                    break;

                case "^":

                    screen.textContent += "**";
                    expressionDisplay.textContent += "**";

                    break;

                case "!":

                    let num = eval(expression);

                    let result = 1;

                    for(let i = 1; i <= num; i++){
                        result *= i;
                    }

                    screen.textContent = result;

                    addToHistory(expression, result);

                    break;

                case "(":

                    screen.textContent += "(";
                    expressionDisplay.textContent += "(";

                    break;

                case ")":

                    screen.textContent += ")";
                    expressionDisplay.textContent += ")";

                    break;

                case "|x|":

                    screen.textContent =
                        Math.abs(eval(expression));

                    addToHistory(expression, screen.textContent);

                    break;

                case "1/x":

                    screen.textContent =
                        1 / eval(expression);

                    addToHistory(expression, screen.textContent);

                    break;

                case "EXP":

                    screen.textContent += "e";
                    expressionDisplay.textContent += "e";

                    break;

            }

        }catch{

            screen.textContent = "Error";

        }

    });

});

/* =========================
   CLEAR HISTORY
========================= */

clearHistoryButton.addEventListener("click", () => {

    historyList.innerHTML = "";

    localStorage.removeItem("calculatorHistory");

});

/* =========================
   LOAD HISTORY
========================= */

loadHistory();