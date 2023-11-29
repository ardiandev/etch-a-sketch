const board = document.querySelector(".board");
const input = document.querySelector(".input-size");
const changeSize = document.querySelector(".change-size-btn");
const display = document.querySelector(".display");
const buttonsDiv = document.querySelector(".buttons");

//Handle buttons
buttonsDiv.addEventListener("click", handleButtons);

function handleButtons(event) {
  let inputBtn = event.target.className;
  switch (inputBtn) {
    case "reset":
      handleReset();
      break;
    default:
      return;
  }
}

//Handle Reset
function handleReset() {
  clearDiv();
  createDiv(16);
  input.value = "";
}

//Button style
const buttons = document.querySelectorAll("button");

buttons.forEach(btn => {
  btn.addEventListener("click", e => {
    e.target.style.backgroundColor = "#f3f0ca";
    e.target.style.color = "black";

    let intervalId;
    intervalId = setInterval(() => {
      e.target.style.backgroundColor = "#192655";
      e.target.style.color = "#f3f0ca";
    }, 500);
  });
});

createDiv(16); // Set initial div inside board to 16
input.value = ""; //clear input value

//Handle create div in the board
function createDiv(size) {
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  let amount = size * size;
  for (let i = 0; i < amount; i++) {
    let divs = document.createElement("div");
    divs.style.border = "1px solid black";
    board.insertAdjacentElement("beforeend", divs);
  }
}

//Change Size div inside board
changeSize.addEventListener("click", handleChangeSize);

//handle clear board div
function clearDiv() {
  let divs = board.querySelectorAll("div");
  divs.forEach(div => div.remove());
}

//Handle change size
function handleChangeSize() {
  let inputSize = Number(input.value);

  if (inputSize >= 2 && inputSize <= 100) {
    clearDiv();
    createDiv(inputSize);
    display.textContent = "You can draw!";
    display.style.color = "black";
  } else {
    display.textContent = "Please type between 2 to 100";
    display.style.color = "red";
    return;
  }
}

//Handle reset
