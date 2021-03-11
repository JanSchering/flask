import { SETUP, COLORS } from "./literals";
import { createColorPicker } from "./utils";
import { colorPickerListener } from "./listeners";

/**
 * @description INIT-Function: Creates a Form where players can make their choices.
 * Enriches the player-objects and initializes the board based on the choices.
 * @returns {Promise} A promise that indicates the init-status of the board: resolves when the setup is done.
 */
export async function init() {
  const responses = new Promise((resolve, reject) => {
    // CREATE INITIAL FORM
    const tmpContainer = document.createElement("div");
    tmpContainer.innerHTML = SETUP;
    const form = tmpContainer.childNodes[0];

    // APPEND INITIAL FORM TO DOM
    document.querySelector("body").appendChild(form);

    // Inititalize the ColorPickerListener
    const pickerListener = colorPickerListener();

    // Set up a ColorPicker for each player
    const picker1 = createColorPicker("picker1", "red");
    pickerListener.bind(this.player1)(picker1);
    document.getElementById("p1Setup").appendChild(picker1);
    const picker2 = createColorPicker("picker2", "blue");
    pickerListener.bind(this.player2)(picker2);
    document.getElementById("p2Setup").appendChild(picker2);

    // Attach Listener to the submit button
    document
      .getElementById("submit")
      .addEventListener("click", () => {
        // ENRICH PLAYER OBJECTS WITH FORM DATA
        this.player1.name = document.getElementById("name_1").value;
        this.player2.name = document.getElementById("name_2").value;
        document.getElementById(
          "player1"
        ).textContent = this.player1.name;
        document.getElementById(
          "player2"
        ).textContent = this.player2.name;

        form.parentNode.removeChild(form);

        //INITIAL FILLING OF THE CANVAS WITH THE STARTING POSITIONS
        this.ctx.fillStyle = COLORS[this.player1.color];
        this.ctx.fillRect(
          this.player1.x_pos,
          this.player1.y_pos,
          5,
          5
        );
        this.ctx.fillStyle = COLORS[this.player2.color];
        this.ctx.fillRect(
          this.player2.x_pos,
          this.player2.y_pos,
          5,
          5
        );
        resolve();
      });
  });
  return responses;
}
