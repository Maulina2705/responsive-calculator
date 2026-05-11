const screen = document.getElementById("screen");
const expressionDisplay = document.getElementById("expression");

/* =========================
   UPDATE SCREEN
========================= */

function updateScreen(value) {

    if (showingFraction) return;

    screen.innerHTML = value;

}

/* =========================
   MODE & THEME
========================= */

const standardBtn = document.getElementById("standardBtn");
const scientificBtn = document.getElementById("scientificBtn");

const scientificMode =
    document.querySelector(".scientific-mode");

const calculator =
    document.querySelector(".calculator");

const themeToggle =
    document.getElementById("themeToggle");

const body = document.body;

/* =========================
   ANGLE MODE
========================= */

const degBtn =
    document.getElementById("degBtn");

const radBtn =
    document.getElementById("radBtn");

let angleMode = "DEG";

/* =========================
   CALCULATOR STATE
========================= */

let lastOperator = "";
let lastNumber = "";

let lastAnswer = 0;

let justCalculated = false;
let waitingForNewNumber = false;
let showingFraction = false;

/* =========================
   HISTORY
========================= */

const historyPanel =
    document.querySelector(".history-panel");

const historyList =
    document.querySelector(".history-list");

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
   LOAD THEME
========================= */

const savedTheme =
    localStorage.getItem("theme");

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

    calculator.classList.add(
        "scientific-layout"
    );

});

standardBtn.addEventListener("click", () => {

    scientificMode.classList.add("hidden");

    historyPanel.style.display = "none";

    standardBtn.classList.add("active");
    scientificBtn.classList.remove("active");

    calculator.classList.remove(
        "scientific-layout"
    );

});

/* =========================
   ANGLE MODE
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
   HISTORY
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

    const item =
        document.createElement("div");

    item.classList.add("history-item");

    item.textContent =
        `${expression} = ${result}`;

    historyList.prepend(item);

    saveHistory();

}

/* =========================
   ANGLE CONVERTER
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
   SCIENTIFIC FUNCTIONS
========================= */

function sin(value) {

    return Math.sin(
        toRadians(value)
    );

}

function cos(value) {

    return Math.cos(
        toRadians(value)
    );

}

function tan(value) {

    return Math.tan(
        toRadians(value)
    );

}

function asin(value) {

    return fromRadians(
        Math.asin(value)
    );

}

function acos(value) {

    return fromRadians(
        Math.acos(value)
    );

}

function atan(value) {

    return fromRadians(
        Math.atan(value)
    );

}

function log(value) {

    return Math.log10(value);

}

function ln(value) {

    return Math.log(value);

}

function sqrt(value) {

    return Math.sqrt(value);

}

function abs(value) {

    return Math.abs(value);

}

/* =========================
   FORMAT EXPRESSION
========================= */

function formatExpression(expression) {

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

        .replace(/√/g, "sqrt")

        .replace(/π/g, "Math.PI")

        .replace(/\be\b/g, "Math.E")

        .replace(/\^/g, "**");

}

/* =========================
   FRACTION CONVERTER
========================= */

function decimalToFraction(decimal) {

    if (Number.isInteger(decimal)) {

        return decimal.toString();

    }

    const tolerance = 1.0E-6;

    let numerator = 1;
    let denominator = 1;

    let error = Math.abs(
        decimal - numerator / denominator
    );

    for (let d = 1; d <= 1000; d++) {

        let n = Math.round(decimal * d);

        let newError = Math.abs(
            decimal - n / d
        );

        if (newError < error) {

            numerator = n;
            denominator = d;

            error = newError;

        }

        if (error < tolerance) {

            break;

        }

    }


    return `${numerator}/${denominator}`;

}

function renderFraction(fraction) {

    const parts = fraction.split("/");

    if (parts.length !== 2) {

        updateScreen(fraction);

        return;

    }

    const numerator = parts[0];
    const denominator = parts[1];

    updateScreen(`

        <span class="pretty-fraction">

            <sup>${numerator}</sup>

            <span class="fraction-line"></span>

            <sub>${denominator}</sub>

        </span>

    `);

}

/* =========================
   NUMBER BUTTONS
========================= */

numberButtons.forEach(button => {

    button.addEventListener("click", () => {
        if (showingFraction) {

            showingFraction = false;

            updateScreen("0");

        }

        if (waitingForNewNumber) {

            updateScreen("");

            expressionDisplay.textContent = "";

            waitingForNewNumber = false;
            justCalculated = false;

        }

        if (screen.innerText === "0") {

            updateScreen("");

        }

        expressionDisplay.textContent +=
            button.textContent;

        updateScreen(
            expressionDisplay.textContent
        );

    });

});

/* =========================
   OPERATOR BUTTONS
========================= */

operatorButtons.forEach(button => {

    if (showingFraction) {

        showingFraction = false;

    }

    button.addEventListener("click", () => {

        const operator =
            button.textContent;

        let expression =
            expressionDisplay.textContent;

        if (justCalculated) {

            expression = lastAnswer.toString();

            expressionDisplay.textContent =
                expression;

            justCalculated = false;

        }

        waitingForNewNumber = false;

        const lastChar =
            expression.slice(-1);

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

        updateScreen(expression);

    });

});

/* =========================
   CLEAR
========================= */

clearButton.addEventListener("click", () => {

    showingFraction = false;
    updateScreen("0");

    expressionDisplay.textContent = "";

});

/* =========================
   BACKSPACE
========================= */

backspaceButton.addEventListener("click", () => {

    showingFraction = false;

    expressionDisplay.textContent =
        expressionDisplay.textContent
            .slice(0, -1);

    updateScreen(
        expressionDisplay.textContent
    );

    if (screen.innerText === "") {

        updateScreen("0");

    }

});

/* =========================
   CALCULATE
========================= */

function calculate() {

    try {

        let expression =
            expressionDisplay.textContent;

        if (
            justCalculated &&
            lastOperator &&
            lastNumber
        ) {

            expression =
                `${lastAnswer}${lastOperator}${lastNumber}`;

        }

        const openBrackets =
            (expression.match(/\(/g) || [])
                .length;

        const closeBrackets =
            (expression.match(/\)/g) || [])
                .length;

        const missingBrackets =
            openBrackets - closeBrackets;

        if (missingBrackets > 0) {

            expression +=
                ")".repeat(missingBrackets);

        }

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

        const result = Function(

            "sin",
            "cos",
            "tan",
            "asin",
            "acos",
            "atan",
            "log",
            "ln",
            "sqrt",
            "abs",

            `return ${formattedExpression}`

        )(
            sin,
            cos,
            tan,
            asin,
            acos,
            atan,
            log,
            ln,
            sqrt,
            abs
        );
        console.log(result);

        lastAnswer = result;

        updateScreen(result);

        expressionDisplay.textContent =
            expression;

        addToHistory(expression, result);

        justCalculated = true;

        waitingForNewNumber = true;

    } catch {

        updateScreen("Error");

    }

}

/* =========================
   EQUAL
========================= */

equalButton.addEventListener("click", () => {

    calculate();

});

/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener("keydown", (event) => {

    const key = event.key;

    if (/[0-9]/.test(key)) {

        if (waitingForNewNumber) {

            updateScreen("");

            expressionDisplay.textContent = "";

            waitingForNewNumber = false;
            justCalculated = false;

        }

        if (screen.innerText === "0") {

            updateScreen("");

        }

        expressionDisplay.textContent += key;

        updateScreen(
            expressionDisplay.textContent
        );

    }

    else if (key === ".") {

        expressionDisplay.textContent += key;

        updateScreen(
            expressionDisplay.textContent
        );

    }

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

            expression = lastAnswer.toString();

            expressionDisplay.textContent =
                expression;

            justCalculated = false;

        }

        waitingForNewNumber = false;

        const lastChar =
            expression.slice(-1);

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

        updateScreen(expression);

    }

    else if (key === "Enter") {

        event.preventDefault();

        calculate();

    }

    else if (key === "Backspace") {

        event.preventDefault();

        expressionDisplay.textContent =
            expressionDisplay.textContent
                .slice(0, -1);

        updateScreen(
            expressionDisplay.textContent
        );

        if (screen.innerText === "") {

            updateScreen("0");

        }

    }

    else if (key === "Escape") {

        updateScreen("0");

        expressionDisplay.textContent = "";

    }

});

/* =========================
   SCIENTIFIC BUTTONS
========================= */

scientificButtons.forEach(button => {

    button.addEventListener("click", () => {

        const value =
            button.textContent.trim();

        if (
            waitingForNewNumber &&
            value !== "a/b"
        ) {

            updateScreen("");

            expressionDisplay.textContent = "";

            waitingForNewNumber = false;
            justCalculated = false;

        }

        if (
            expressionDisplay.textContent ===
            "0"
        ) {

            expressionDisplay.textContent = "";

            updateScreen("");

        }

        switch (value) {

            case "sin":

                expressionDisplay.textContent +=
                    "sin(";

                updateScreen(
                    expressionDisplay.textContent
                );

                break;

            case "cos":

                expressionDisplay.textContent +=
                    "cos(";

                updateScreen(
                    expressionDisplay.textContent
                );

                break;

            case "tan":

                expressionDisplay.textContent +=
                    "tan(";

                updateScreen(
                    expressionDisplay.textContent
                );

                break;

            case "asin":

                expressionDisplay.textContent +=
                    "asin(";

                updateScreen(
                    expressionDisplay.textContent
                );

                break;

            case "acos":

                expressionDisplay.textContent +=
                    "acos(";

                updateScreen(
                    expressionDisplay.textContent
                );

                break;

            case "atan":

                expressionDisplay.textContent +=
                    "atan(";

                updateScreen(
                    expressionDisplay.textContent
                );

                break;

            case "log":

                expressionDisplay.textContent +=
                    "log(";

                updateScreen(
                    expressionDisplay.textContent
                );

                break;

            case "ln":

                expressionDisplay.textContent +=
                    "ln(";

                updateScreen(
                    expressionDisplay.textContent
                );

                break;

            case "√":

                expressionDisplay.textContent +=
                    "√(";

                updateScreen(
                    expressionDisplay.textContent
                );

                break;

            case "x²":

                expressionDisplay.textContent +=
                    "^2";

                updateScreen(
                    expressionDisplay.textContent
                );

                break;

            case "x³":

                expressionDisplay.textContent +=
                    "^3";

                updateScreen(
                    expressionDisplay.textContent
                );

                break;

            case "^":

                expressionDisplay.textContent +=
                    "^";

                updateScreen(
                    expressionDisplay.textContent
                );

                break;

            case "π":

                expressionDisplay.textContent +=
                    "π";

                updateScreen(
                    expressionDisplay.textContent
                );

                break;

            case "e":

                expressionDisplay.textContent +=
                    "e";

                updateScreen(
                    expressionDisplay.textContent
                );

                break;

            case "|x|":

                expressionDisplay.textContent +=
                    "abs(";

                updateScreen(
                    expressionDisplay.textContent
                );

                break;

            case "1/x":

                expressionDisplay.textContent =
                    `1/(${expressionDisplay.textContent})`;

                updateScreen(
                    expressionDisplay.textContent
                );

                break;

            case "!":

                expressionDisplay.textContent +=
                    "!";

                updateScreen(
                    expressionDisplay.textContent
                );

                break;

            case "a/b":

                showingFraction = true;

                screen.innerHTML = `

    <div class="fraction">

        <span class="whole"></span>

        <div class="fraction-stack">

            <span class="top">
                ${parts[0]}
            </span>

            <span class="bottom">
                ${parts[1]}
            </span>

        </div>

    </div>

`;

                break;

            case "(":

                expressionDisplay.textContent +=
                    "(";

                updateScreen(
                    expressionDisplay.textContent
                );

                break;

            case ")":

                expressionDisplay.textContent +=
                    ")";

                updateScreen(
                    expressionDisplay.textContent
                );

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