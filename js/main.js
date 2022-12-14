/**
 *  0-9
 *  .
 *  + - * /
 *
 *  = C
 */
const buttonsPanelDom = document.getElementById("calc-buttons");
const displayDom = document.getElementById("display");
const powerButtonDom = document.getElementById("power-button");

let isDisplayOn = true;

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

  const lastCharAtEnd = expression.slice(-1);

  if (isNaN(lastCharAtEnd) && isNaN(value)) return;

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
