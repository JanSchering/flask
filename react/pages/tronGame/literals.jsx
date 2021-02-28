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
const STARTING_COORD = 150;

//THE HEIGHT AND WIDTH OF THE CANVAS IN THE HTML
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 500;

//DIRECTIONS
const UP = "UP";
const DOWN = "DOWN";
const LEFT = "LEFT";
const RIGHT = "RIGHT";
const NONE = "NONE";

//COLORS
const COLORS = {
  red: "#ff0000",
  blue: "#0066ff",
  green: "#33cc33",
  yellow: "#ffff00",
};

// INIT LITERALS AND VARIABLES
const GAME = {
  intervalID: undefined,
  ctx: undefined,
  playerInfo: {},
  onTimerTick: undefined,
  scores: undefined,
  player1: {
    name: undefined,
    x_pos: STARTING_COORD,
    y_pos: STARTING_COORD,
    direction: NONE,
    color: "red",
  },
  player2: {
    name: undefined,
    x_pos: STARTING_COORD,
    y_pos: STARTING_COORD * 2,
    direction: NONE,
    color: "blue",
  },
};

export {
  SETUP,
  COLORPICKER,
  STARTING_COORD,
  GAME,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  UP,
  DOWN,
  LEFT,
  RIGHT,
  NONE,
  COLORS,
};
