// LISTEN TO THE KEYSTROKES AND ADJUST ACCORDINGLY
export async function addKeydownListener() {
  document.addEventListener("keydown", event => {
    let { player1, player2 } = this;
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    const prevDirectionP1 = player1.direction;
    const prevDirectionP2 = player2.direction;
    clearInterval(this.intervalID);
    const keyCode = event.keyCode;
    switch (keyCode) {
      case 38:
        if (prevDirectionP1 !== "DOWN") player1.direction = "UP";
        break;
      case 40:
        if (prevDirectionP1 !== "UP") player1.direction = "DOWN";
        break;
      case 39:
        if (prevDirectionP1 !== "LEFT") player1.direction = "RIGHT";
        break;
      case 37:
        if (prevDirectionP1 !== "RIGHT") player1.direction = "LEFT";
        break;
      case 87:
        if (prevDirectionP2 !== "DOWN") player2.direction = "UP";
        break;
      case 65:
        if (prevDirectionP2 !== "RIGHT") player2.direction = "LEFT";
        break;
      case 68:
        if (prevDirectionP2 !== "LEFT") player2.direction = "RIGHT";
        break;
      case 83:
        if (prevDirectionP2 !== "UP") player2.direction = "DOWN";
        break;
    }
    this.player1 = player1;
    this.player2 = player2;
    const boundHandler = this.onTimerTick.bind(this);
    this.intervalID = setInterval(boundHandler, 33);
  });
}

/**
 * @returns {(HTMLDivElement) => {}} A function that creates a listener on a given ColorPicker-Element.
 */
export const colorPickerListener = function() {
  return function(pickerNode) {
    const pickerChoices = pickerNode.querySelectorAll(
      ".pickerChoice"
    );
    Array.prototype.forEach.call(pickerChoices, choice => {
      choice.addEventListener("click", e => {
        const prevPicked = pickerNode.querySelector(
          `div[data-color="${this.color}"]`
        );
        prevPicked.className = prevPicked.className.replace(
          "picked",
          ""
        );
        this.color = e.target.getAttribute("data-color");
        e.target.className += " picked";
      });
    });
  };
};
