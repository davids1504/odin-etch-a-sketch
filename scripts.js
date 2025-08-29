const gridContainer = document.querySelector(".container");

let squaresInRow = 16;
let containerWidth = parseInt(window.getComputedStyle(gridContainer).width.replace(/\D/g, ""));
let isRandomColorOn = false;

function createSquares() {
  gridContainer.innerHTML = "";
  let squaresTotal = squaresInRow * squaresInRow;
  for (let i = 0; i < squaresTotal; i++) {
    const square = document.createElement("div");
    square.style.cssText = `
        width: ${containerWidth / squaresInRow}px;
        height: ${containerWidth / squaresInRow}px;
        border: 1px transparent green;
    `;
    switch (i) {
      case 0:
        square.style.borderTopLeftRadius = "18px";
        break;
      case squaresInRow - 1:
        square.style.borderTopRightRadius = "18px";
        break;
      case squaresTotal - squaresInRow:
        square.style.borderBottomLeftRadius = "18px";
        break;
      case squaresTotal - 1:
        square.style.borderBottomRightRadius = "18px";
        break;
    }
    gridContainer.appendChild(square);
  }

  // Set up event listeners for every square
  let squares = document.querySelectorAll(".container div");
  squares.forEach((el) => {
    el.addEventListener("mouseover", () => {
      el.style.backgroundColor = "greenyellow";
    });

    el.addEventListener("mouseout", () => {
      el.style.backgroundColor = isRandomColorOn
        ? `rgb(${getRandomRGBValue()}, ${getRandomRGBValue()}, ${getRandomRGBValue()})`
        : "green";
    });
  });
}

createSquares();

function getRandomRGBValue() {
  return Math.round(Math.random() * 257);
}

function changeResolution() {
  const button = document.querySelector(".resolution-change-button");
  button.addEventListener("click", () => {
    squaresInRow = parseInt(prompt("Number of squares per row (100 max): ", 16));
    if (squaresInRow > 100) {
      alert("100 is max value! Please enter a valid value.");
      return;
    }
    createSquares();
  });
}

function toggleRandomColors() {
  const button = document.querySelector(".random-colors-button");
  button.addEventListener("click", () => {
    isRandomColorOn = isRandomColorOn ? false : true;
    button.style.backgroundColor = isRandomColorOn ? "greenyellow" : "gray";
  });
}

toggleRandomColors();
changeResolution();
