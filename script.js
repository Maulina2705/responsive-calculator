const screen = document.getElementById("screen");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");

const equalButton = document.querySelector(".equal");
const scientificButtons = document.querySelectorAll(".scientific");

/* =========================
   NUMBER BUTTON
========================= */

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        screen.value += button.textContent;

    });

});

/* =========================
   OPERATOR BUTTON
========================= */

operatorButtons.forEach(button => {

    button.addEventListener("click", () => {

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
   EQUAL BUTTON
========================= */

equalButton.addEventListener("click", () => {

    try{

        screen.value = eval(screen.value);

    }catch{

        screen.value = "Error";

    }

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
        screen.value += key;
    }

    /* ENTER */

    else if(key === "Enter"){

        event.preventDefault();

        try{

            screen.value = eval(screen.value);

        }catch{

            screen.value = "Error";

        }

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

    });

});