const screen = document.getElementById("screen");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");

const equalButton = document.querySelector(".equal");

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