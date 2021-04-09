//TEMPLATE FOR THE SETUP-FORM
const SETUP = `<div class="setup">
  <p>Enter Names and choose color:</p>
  <div class="player" id="p1Setup">
    <label>Player 1</label>
    <input type="text" id="name_1">
  </div>
  <br />
  <div class="player" id="p2Setup">
    <label>Player 2</label>
    <input type="text" id="name_2">
  </div>
  <br />
  <input id="submit" type="button" value="Done" />
</div>
    `;

// TEMPLATE FOR THE COLORPICKER
const COLORPICKER = `<div class="colorPicker">
  <div class="pickerChoice blue" data-color="blue"></div>
  <div class="pickerChoice red" data-color="red"></div>
  <div class="pickerChoice green" data-color="green"></div>
  <div class="pickerChoice yellow" data-color="yellow"></div>
</div>
`;

//BASE NUMBER THAT CAN BE USED AS A STARTING COORDINATE FOR THE CANVAS
const X_START = 150;
const Y_START = 150;

//THE HEIGHT AND WIDTH OF THE CANVAS IN THE HTML
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 500;

//DIRECTIONS
const DIRECTIONS = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  NONE: "NONE",
};

//COLORS
const COLORS = {
  red: "#ff0000",
  blue: "#0066ff",
  green: "#33cc33",
  yellow: "#ffff00",
};

export {
  SETUP,
  COLORPICKER,
  X_START,
  Y_START,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DIRECTIONS,
  COLORS,
};
