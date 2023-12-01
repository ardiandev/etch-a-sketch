const board = document.querySelector(".board");
const input = document.querySelector(".input-size");
const changeSize = document.querySelector(".change-size-btn");
const display = document.querySelector(".display");
const buttonsDiv = document.querySelector(".buttons");
let color = "default"; //Initial the drawing color. Default means black.

//Start the board after DOM Content Loaded
document.addEventListener("DOMContentLoaded", startBoard);

function startBoard() {
  createDiv(16); // Set initial div inside board to 16
  input.value = ""; //clear input value
}

// Add drawing functionality by hovering in the board

board.addEventListener("click", drawing);

let status = false; //Status for start and stop drawing
function drawing(event) {
  // console.log(event.target);
  if (!status) {
    board.addEventListener("mouseover", handleColor);
    console.log("stop");
    console.log(event.target);
    status = true;
  } else {
    board.removeEventListener("mouseover", handleColor);
    console.log("stop");
    status = false;
  }
}

function handleColor(event) {
  let theColor;
  if (color === "rgb") {
    theColor = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
      Math.random() * 256
    )},${Math.floor(Math.random() * 256)} )`;
  } else if (color === "gray") {
    theColor = "gray";
  } else {
    theColor = "black";
  }

  if (event.target.className !== "board" && status == true) {
    event.target.style.backgroundColor = theColor;
  }
}

//Handle buttons
buttonsDiv.addEventListener("click", handleButtons);

function handleButtons(event) {
  console.log(event.target.textContent.toLowerCase());
  let inputBtn = event.target.textContent.toLowerCase();
  // console.log(inputBtn);
  switch (inputBtn) {
    case "reset":
      handleReset();
      break;
    case "gray":
    case "black":
    case "rgb":
      handleColorBtn(inputBtn);
      break;
    default:
      return;
  }
}

//Add handle color change btn
function handleColorBtn(input) {
  color = input;
  console.log(color);
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
    e.target.classList.add("clicked-btn");

    let intervalId;
    intervalId = setInterval(() => {
      e.target.style.backgroundColor = "#192655";
      e.target.style.color = "#f3f0ca";
      e.target.classList.remove("clicked-btn");
    }, 200);
  });
});

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
  status = false;

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
