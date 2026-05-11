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
   ANGLE MODE
========================= */

const degBtn = document.getElementById("degBtn");
const radBtn = document.getElementById("radBtn");

let angleMode = "DEG";

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

    /* SAVE THEME */

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

        if (
            lastChar === "+" ||
            lastChar === "-" ||
            lastChar === "*" ||
            lastChar === "/" ||
            lastChar === "%"
        ) {
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
   HISTORY FUNCTIONS
========================= */

function saveHistory() {

    const items = [];

    document.querySelectorAll(".history-item").forEach(item => {

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

            const item = document.createElement("div");

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

function loadHistory() {

    const savedHistory = localStorage.getItem("calculatorHistory");

    if (savedHistory) {

        historyList.innerHTML = savedHistory;

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
   CALCULATE
========================= */

function calculate() {

    try {

        const expression = screen.value;

        const result = eval(expression);

        screen.value = result;

        addToHistory(expression, result);

    } catch {

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

    if (/[0-9]/.test(key)) {

        screen.value += key;

    }

    else if (key === ".") {

        screen.value += key;

    }

    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
    ) {

        const lastChar = screen.value.slice(-1);

        if (
            lastChar === "+" ||
            lastChar === "-" ||
            lastChar === "*" ||
            lastChar === "/" ||
            lastChar === "%"
        ) {
            return;
        }

        screen.value += key;

    }

    else if (key === "Enter") {

        event.preventDefault();

        calculate();

    }

    else if (key === "Backspace") {

        event.preventDefault();

        screen.value = screen.value.slice(0, -1);

    }

    else if (key === "Escape") {

        screen.value = "";

    }

});

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
   SCIENTIFIC BUTTONS
========================= */

scientificButtons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent;

        const expression = screen.value;

        try {

            switch (value) {

                case "sin":

                    screen.value = Math.sin(
                        toRadians(eval(screen.value))
                    );

                    addToHistory(expression, screen.value);

                    break;

                case "cos":

                    screen.value = Math.cos(
                        toRadians(eval(screen.value))
                    );

                    addToHistory(expression, screen.value);

                    break;

                case "tan":

                    screen.value = Math.tan(
                        toRadians(eval(screen.value))
                    );

                    addToHistory(expression, screen.value);

                    break;

                case "asin":

                    screen.value = fromRadians(
                        Math.asin(eval(screen.value))
                    );

                    addToHistory(expression, screen.value);

                    break;

                case "acos":

                    screen.value = fromRadians(
                        Math.acos(eval(screen.value))
                    );

                    addToHistory(expression, screen.value);

                    break;

                case "atan":

                    screen.value = fromRadians(
                        Math.atan(eval(screen.value))
                    );

                    addToHistory(expression, screen.value);

                    break;

                case "log":
                    screen.value = Math.log10(eval(screen.value));
                    addToHistory(expression, screen.value);
                    break;

                case "ln":
                    screen.value = Math.log(eval(screen.value));
                    addToHistory(expression, screen.value);
                    break;

                case "π":
                    screen.value += Math.PI;
                    break;

                case "e":
                    screen.value += Math.E;
                    break;

                case "√":
                    screen.value = Math.sqrt(eval(screen.value));
                    addToHistory(expression, screen.value);
                    break;

                case "x²":
                    screen.value = Math.pow(eval(screen.value), 2);
                    addToHistory(expression, screen.value);
                    break;

                case "x³":
                    screen.value = Math.pow(eval(screen.value), 3);
                    addToHistory(expression, screen.value);
                    break;

                case "^":
                    screen.value += "**";
                    break;

                case "!":

                    let num = eval(screen.value);
                    let result = 1;

                    for (let i = 1; i <= num; i++) {
                        result *= i;
                    }

                    screen.value = result;

                    addToHistory(expression, screen.value);

                    break;

                case "(":
                    screen.value += "(";
                    break;

                case ")":
                    screen.value += ")";
                    break;

                case "|x|":
                    screen.value = Math.abs(eval(screen.value));
                    addToHistory(expression, screen.value);
                    break;

                case "1/x":
                    screen.value = 1 / eval(screen.value);
                    addToHistory(expression, screen.value);
                    break;

                case "EXP":
                    screen.value += "e";
                    break;

                default:
                    break;

            }

        } catch {

            screen.value = "Error";

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