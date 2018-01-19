let id = 1;
const generateDiv = function(3) {
  let div = document.getElementById("div");
  for (var count = 0; count < 3; count++) {
    div.appenChild(generateInput());
    div.id = id++;
  }
  return div;
}

const generateInput = function() {
  let input = document.createElement("input");
  return input;
}

window.onload = generateDiv;
