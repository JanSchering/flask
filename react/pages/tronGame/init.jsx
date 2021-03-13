import { SETUP, COLORS } from "./literals";
import { ColorPicker } from "./colorPicker.js";

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

    // Set up a ColorPicker for each player
    const picker1 = new ColorPicker("red");
    document.getElementById("p1Setup").appendChild(picker1.domNode);
    const picker2 = new ColorPicker("blue");
    document.getElementById("p2Setup").appendChild(picker2.domNode);

    // Attach Listener to the submit button,
    // resolve promise with responses on submit
    document
      .getElementById("submit")
      .addEventListener("click", () => {
        const p1Name = document.getElementById("name_1").value;
        const p2Name = document.getElementById("name_2").value;
        const p1Color = picker1.getColor();
        const p2Color = picker2.getColor();
        form.parentNode.removeChild(form);

        resolve({
          p1Name,
          p1Color,
          p2Name,
          p2Color
        });
      });
  });
  return responses;
}
