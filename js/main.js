const buttonsPanelDom = document.getElementById("calc-buttons");
const displayDom = document.getElementById("display");
const powerButtonDom = document.getElementById("power-button");

let isDisplayOn = false;
let isEvaluated = false;

const displayableButtons = [
  ["7", "8", "9", "+"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "*"],
  [".", "0", "/", "="],
];

let expression = "";

(function renderButtons() {
  let buttonsDOM = "";
  for (buttonsArray of displayableButtons) {
    for (button of buttonsArray) {
      const customClass = button == "=" ? "equal" : "";
      buttonsDOM += `<button onclick="onButtonClick('${button}')" class="num-button button ${customClass}">${button}</button>`;
    }
  }
  buttonsPanelDom.innerHTML = buttonsDOM;
})();

function onButtonClick(value) {
  if (!isDisplayOn) return;

  if (value == "=") {
    expression = eval(expression);
    updateDisplay(expression);
    isEvaluated = true;
    return;
  }

  if (isEvaluated) {
    clearAll();
    isEvaluated = false;
  }

  const tempExp = expression + value;
  const numberStrings = tempExp.split(/[+*/-]+/);
  const operatorsStrings = tempExp.split(/[0-9.]+/);
  const currentOperator = operatorsStrings.splice(-1)[0];
  const lastNumber = numberStrings.splice(-1)[0];

  if (currentOperator.length > 1 || isNaN(lastNumber)) return;

  if (lastNumber == ".") value = "0.";

  expression += value;
  updateDisplay(expression);
}

function updateDisplay(value) {
  displayDom.innerHTML = value;
}

function powerToggle() {
  isDisplayOn = !isDisplayOn;
  if (isDisplayOn) {
    powerButtonDom.style.backgroundColor = "rgb(14, 238, 14)";
  } else {
    powerButtonDom.style.backgroundColor = "red";
    clearAll();
  }
}

powerToggle();
function clearAll() {
  expression = "";
  updateDisplay(expression);
}
