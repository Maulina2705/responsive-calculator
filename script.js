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
   CALCULATOR STATE
========================= */

let lastOperator = "";
let lastNumber = "";

let justCalculated = false;
let waitingForNewNumber = false;

/* =========================
   HISTORY
========================= */

const historyPanel = document.querySelector(".history-panel");
const historyList = document.querySelector(".history-list");

const clearHistoryButton =
    document.getElementById("clearHistory");

/* =========================
   BUTTONS
========================= */

const numberButtons =
    document.querySelectorAll(".number");

const operatorButtons =
    document.querySelectorAll(".operator");

const clearButton =
    document.querySelector(".clear");

const backspaceButton =
    document.querySelector(".backspace");

const equalButton =
    document.querySelector(".equal");

const scientificButtons =
    document.querySelectorAll(".scientific");

/* =========================
   LOAD SAVED THEME
========================= */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    body.classList.add("light-mode");

    themeToggle.textContent = "☀️";

}

/* =========================
   THEME TOGGLE
========================= */

themeToggle.addEventListener("click", () => {

    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {

        themeToggle.textContent = "☀️";

        localStorage.setItem("theme", "light");

    } else {

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

function saveHistory() {

    const items = [];

    document.querySelectorAll(".history-item")
        .forEach(item => {

            items.push(item.textContent);

        });

    localStorage.setItem(
        "calculatorHistory",
        JSON.stringify(items)
    );

}

function loadHistory() {

    const savedHistory = JSON.parse(
        localStorage.getItem("calculatorHistory")
    );

    if (savedHistory) {

        savedHistory.forEach(history => {

            const item =
                document.createElement("div");

            item.classList.add("history-item");

            item.textContent = history;

            historyList.appendChild(item);

        });

    }

}

function addToHistory(expression, result) {

    const item = document.createElement("div");

    item.classList.add("history-item");

    item.textContent = `${expression} = ${result}`;

    historyList.prepend(item);

    saveHistory();

}

/* =========================
   ANGLE CONVERSION
========================= */

function toRadians(value) {

    if (angleMode === "DEG") {

        return value * (Math.PI / 180);

    }

    return value;

}

function fromRadians(value) {

    if (angleMode === "DEG") {

        return value * (180 / Math.PI);

    }

    return value;

}

/* =========================
   FORMAT EXPRESSION
========================= */

function formatExpression(expression) {

    /* FACTORIAL */

    expression = expression.replace(
        /(\d+)!/g,
        (_, n) => {

            let result = 1;

            for (let i = 1; i <= n; i++) {
                result *= i;
            }

            return result;
        }
    );

    return expression

        .replace(/sin\(/g,
            "Math.sin(toRadians(")

        .replace(/cos\(/g,
            "Math.cos(toRadians(")

        .replace(/tan\(/g,
            "Math.tan(toRadians(")

        .replace(/asin\(/g,
            "fromRadians(Math.asin(")

        .replace(/acos\(/g,
            "fromRadians(Math.acos(")

        .replace(/atan\(/g,
            "fromRadians(Math.atan(")

        .replace(/log\(/g,
            "Math.log10(")

        .replace(/ln\(/g,
            "Math.log(")

        .replace(/√\(/g,
            "Math.sqrt(")

        .replace(/abs\(/g,
            "Math.abs(")

        .replace(/π/g,
            "Math.PI")

        .replace(/\be\b/g,
            "Math.E")

        .replace(/\^/g,
            "**");

}

/* =========================
   NUMBER BUTTONS
========================= */

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (waitingForNewNumber) {

            screen.textContent = "";
            expressionDisplay.textContent = "";

            waitingForNewNumber = false;
            justCalculated = false;

        }

        if (screen.textContent === "0") {
            screen.textContent = "";
        }

        expressionDisplay.textContent +=
            button.textContent;

        screen.textContent =
            expressionDisplay.textContent;

    });

});

/* =========================
   OPERATOR BUTTONS
========================= */

operatorButtons.forEach(button => {

    button.addEventListener("click", () => {

        const operator = button.textContent;

        let expression =
            expressionDisplay.textContent;

        if (justCalculated) {

            expression = screen.textContent;

            expressionDisplay.textContent =
                expression;

            justCalculated = false;
        }

        waitingForNewNumber = false;

        const lastChar = expression.slice(-1);

        if (
            lastChar === "+" ||
            lastChar === "-" ||
            lastChar === "*" ||
            lastChar === "/" ||
            lastChar === "%"
        ) {

            expression =
                expression.slice(0, -1);

        }

        expression += operator;

        expressionDisplay.textContent =
            expression;

        screen.textContent = expression;

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

    expressionDisplay.textContent =
        expressionDisplay.textContent.slice(0, -1);

    screen.textContent =
        expressionDisplay.textContent;

    if (screen.textContent === "") {
        screen.textContent = "0";
    }

});

/* =========================
   CALCULATE
========================= */

function calculate() {

    try {

        let expression =
            expressionDisplay.textContent;

        /* ENTER BERULANG */

        if (
            justCalculated &&
            lastOperator &&
            lastNumber
        ) {

            expression =
                `${screen.textContent}${lastOperator}${lastNumber}`;

        }

        /* AUTO CLOSE PARENTHESIS */

        const openBrackets =
            (expression.match(/\(/g) || []).length;

        const closeBrackets =
            (expression.match(/\)/g) || []).length;

        const missingBrackets =
            openBrackets - closeBrackets;

        if (missingBrackets > 0) {

            expression +=
                ")".repeat(missingBrackets);

        }

        /* SIMPAN OPERATOR */

        const match =
            expression.match(
                /([+\-*/%])(\d+\.?\d*)$/
            );

        if (match) {

            lastOperator = match[1];
            lastNumber = match[2];

        }

        const formattedExpression =
            formatExpression(expression);

        const result =
            eval(formattedExpression);

        screen.textContent = result;

        expressionDisplay.textContent =
            expression;

        addToHistory(expression, result);

        justCalculated = true;

        waitingForNewNumber = true;

    } catch {

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

    /* NUMBER */

    if (/[0-9]/.test(key)) {

        if (waitingForNewNumber) {

            screen.textContent = "";
            expressionDisplay.textContent = "";

            waitingForNewNumber = false;
            justCalculated = false;

        }

        if (screen.textContent === "0") {
            screen.textContent = "";
        }

        expressionDisplay.textContent += key;

        screen.textContent =
            expressionDisplay.textContent;

    }

    /* DECIMAL */

    else if (key === ".") {

        expressionDisplay.textContent += key;

        screen.textContent =
            expressionDisplay.textContent;

    }

    /* OPERATOR */

    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
    ) {

        let expression =
            expressionDisplay.textContent;

        if (justCalculated) {

            expression = screen.textContent;

            expressionDisplay.textContent =
                expression;

            justCalculated = false;
        }

        waitingForNewNumber = false;

        const lastChar = expression.slice(-1);

        if (
            lastChar === "+" ||
            lastChar === "-" ||
            lastChar === "*" ||
            lastChar === "/" ||
            lastChar === "%"
        ) {

            expression =
                expression.slice(0, -1);

        }

        expression += key;

        expressionDisplay.textContent =
            expression;

        screen.textContent = expression;

    }

    /* ENTER */

    else if (key === "Enter") {

        event.preventDefault();

        calculate();

    }

    /* BACKSPACE */

    else if (key === "Backspace") {

        event.preventDefault();

        expressionDisplay.textContent =
            expressionDisplay.textContent
                .slice(0, -1);

        screen.textContent =
            expressionDisplay.textContent;

        if (screen.textContent === "") {
            screen.textContent = "0";
        }

    }

    /* ESCAPE */

    else if (key === "Escape") {

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

        if (waitingForNewNumber) {

            screen.textContent = "";
            expressionDisplay.textContent = "";

            waitingForNewNumber = false;
            justCalculated = false;

        }

        switch (value) {

            /* TRIG */

            case "sin":

                expressionDisplay.textContent +=
                    "sin(";

                screen.textContent =
                    expressionDisplay.textContent;

                break;

            case "cos":

                expressionDisplay.textContent +=
                    "cos(";

                screen.textContent =
                    expressionDisplay.textContent;

                break;

            case "tan":

                expressionDisplay.textContent +=
                    "tan(";

                screen.textContent =
                    expressionDisplay.textContent;

                break;

            case "asin":

                expressionDisplay.textContent +=
                    "asin(";

                screen.textContent =
                    expressionDisplay.textContent;

                break;

            case "acos":

                expressionDisplay.textContent +=
                    "acos(";

                screen.textContent =
                    expressionDisplay.textContent;

                break;

            case "atan":

                expressionDisplay.textContent +=
                    "atan(";

                screen.textContent =
                    expressionDisplay.textContent;

                break;

            /* LOG */

            case "log":

                expressionDisplay.textContent +=
                    "log(";

                screen.textContent =
                    expressionDisplay.textContent;

                break;

            case "ln":

                expressionDisplay.textContent +=
                    "ln(";

                screen.textContent =
                    expressionDisplay.textContent;

                break;

            /* SQRT */

            case "√":

                expressionDisplay.textContent +=
                    "√(";

                screen.textContent =
                    expressionDisplay.textContent;

                break;

            /* POWER */

            case "x²":

                expressionDisplay.textContent +=
                    "^2";

                screen.textContent =
                    expressionDisplay.textContent;

                break;

            case "x³":

                expressionDisplay.textContent +=
                    "^3";

                screen.textContent =
                    expressionDisplay.textContent;

                break;

            case "^":

                expressionDisplay.textContent +=
                    "^";

                screen.textContent =
                    expressionDisplay.textContent;

                break;

            /* CONSTANT */

            case "π":

                expressionDisplay.textContent +=
                    "π";

                screen.textContent =
                    expressionDisplay.textContent;

                break;

            case "e":

                expressionDisplay.textContent +=
                    "e";

                screen.textContent =
                    expressionDisplay.textContent;

                break;

            /* ABS */

            case "|x|":

                expressionDisplay.textContent +=
                    "abs(";

                screen.textContent =
                    expressionDisplay.textContent;

                break;

            /* RECIPROCAL */

            case "1/x":

                expressionDisplay.textContent =
                    `1/(${expressionDisplay.textContent})`;

                screen.textContent =
                    expressionDisplay.textContent;

                break;

            /* FACTORIAL */

            case "!":

                expressionDisplay.textContent +=
                    "!";

                screen.textContent =
                    expressionDisplay.textContent;

                break;

            /* PARENTHESIS */

            case "(":

                expressionDisplay.textContent +=
                    "(";

                screen.textContent =
                    expressionDisplay.textContent;

                break;

            case ")":

                expressionDisplay.textContent +=
                    ")";

                screen.textContent =
                    expressionDisplay.textContent;

                break;

        }

    });

});

/* =========================
   CLEAR HISTORY
========================= */

clearHistoryButton.addEventListener("click", () => {

    historyList.innerHTML = "";

    localStorage.removeItem(
        "calculatorHistory"
    );

});

/* =========================
   LOAD HISTORY
========================= */

loadHistory();