const screen = document.getElementById("screen");

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
   BUTTONS
========================= */

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");

const equalButton = document.querySelector(".equal");

const scientificButtons = document.querySelectorAll(".scientific");

/* =========================
   THEME TOGGLE
========================= */

themeToggle.addEventListener("click", () => {

    body.classList.toggle("light-mode");

    if(body.classList.contains("light-mode")){
        themeToggle.textContent = "☀️";
    }else{
        themeToggle.textContent = "🌙";
    }

});

/* =========================
   MODE SWITCH
========================= */

scientificBtn.addEventListener("click", () => {

    scientificMode.classList.remove("hidden");

    scientificBtn.classList.add("active");
    standardBtn.classList.remove("active");

    calculator.classList.add("scientific-layout");

});

standardBtn.addEventListener("click", () => {

    scientificMode.classList.add("hidden");

    standardBtn.classList.add("active");
    scientificBtn.classList.remove("active");

    calculator.classList.remove("scientific-layout");

});

/* =========================
   NUMBER BUTTONS
========================= */

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        screen.value += button.textContent;

    });

});

/* =========================
   OPERATOR BUTTONS
========================= */

operatorButtons.forEach(button => {

    button.addEventListener("click", () => {

        const lastChar = screen.value.slice(-1);

        /* Prevent double operator */

        if(
            lastChar === "+" ||
            lastChar === "-" ||
            lastChar === "*" ||
            lastChar === "/" ||
            lastChar === "%"
        ){
            return;
        }

        screen.value += button.textContent;

    });

});

/* =========================
   CLEAR BUTTON
========================= */

clearButton.addEventListener("click", () => {

    screen.value = "";

});

/* =========================
   BACKSPACE BUTTON
========================= */

backspaceButton.addEventListener("click", () => {

    screen.value = screen.value.slice(0, -1);

});

/* =========================
   CALCULATE FUNCTION
========================= */

function calculate(){

    try{

        screen.value = eval(screen.value);

    }catch{

        screen.value = "Error";

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

    /* NUMBER */

    if(/[0-9]/.test(key)){

        screen.value += key;

    }

    /* DECIMAL */

    else if(key === "."){

        screen.value += key;

    }

    /* OPERATOR */

    else if(
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
    ){

        const lastChar = screen.value.slice(-1);

        if(
            lastChar === "+" ||
            lastChar === "-" ||
            lastChar === "*" ||
            lastChar === "/" ||
            lastChar === "%"
        ){
            return;
        }

        screen.value += key;

    }

    /* ENTER */

    else if(key === "Enter"){

        event.preventDefault();

        calculate();

    }

    /* BACKSPACE */

    else if(key === "Backspace"){

        event.preventDefault();

        screen.value = screen.value.slice(0, -1);

    }

    /* ESCAPE */

    else if(key === "Escape"){

        screen.value = "";

    }

});

/* =========================
   SCIENTIFIC BUTTONS
========================= */

scientificButtons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent;

        try{

            switch(value){

                case "sin":
                    screen.value = Math.sin(eval(screen.value));
                    break;

                case "cos":
                    screen.value = Math.cos(eval(screen.value));
                    break;

                case "tan":
                    screen.value = Math.tan(eval(screen.value));
                    break;

                case "asin":
                    screen.value = Math.asin(eval(screen.value));
                    break;

                case "acos":
                    screen.value = Math.acos(eval(screen.value));
                    break;

                case "atan":
                    screen.value = Math.atan(eval(screen.value));
                    break;

                case "log":
                    screen.value = Math.log10(eval(screen.value));
                    break;

                case "ln":
                    screen.value = Math.log(eval(screen.value));
                    break;

                case "π":
                    screen.value += Math.PI;
                    break;

                case "e":
                    screen.value += Math.E;
                    break;

                case "√":
                    screen.value = Math.sqrt(eval(screen.value));
                    break;

                case "x²":
                    screen.value = Math.pow(eval(screen.value), 2);
                    break;

                case "x³":
                    screen.value = Math.pow(eval(screen.value), 3);
                    break;

                case "^":
                    screen.value += "**";
                    break;

                case "!":

                    let num = eval(screen.value);
                    let result = 1;

                    for(let i = 1; i <= num; i++){
                        result *= i;
                    }

                    screen.value = result;

                    break;

                case "(":
                    screen.value += "(";
                    break;

                case ")":
                    screen.value += ")";
                    break;

                case "|x|":
                    screen.value = Math.abs(eval(screen.value));
                    break;

                case "1/x":
                    screen.value = 1 / eval(screen.value);
                    break;

                case "EXP":
                    screen.value += "e";
                    break;

                default:
                    break;

            }

        }catch{

            screen.value = "Error";

        }

    });

});