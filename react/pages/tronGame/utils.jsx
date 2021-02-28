import { COLORPICKER } from "./literals";

/**
 * @description Helper-Function: Takes a numeric value for each the red, green and blue amount that we want
 * and returns the respective hexcode.
 * @param {number} r The numeric value of the amount of red (should be between 0 and 255).
 * @param {number} g The numeric value of the amount of green (should be between 0 and 255).
 * @param {number} b The numeric value of the amount of blue (should be between 0 and 255).
 * @returns {string} The Hex-Number as a string.
 */
function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}

/**
 * @description Util-Function: Takes a numeric value for each the red, green and blue amount that we want
 * and returns the Color-Code.
 * @param {number} r The numeric value of the amount of red (should be between 0 and 255).
 * @param {number} g The numeric value of the amount of green (should be between 0 and 255).
 * @param {number} b The numeric value of the amount of blue (should be between 0 and 255).
 * @returns {string} The Hex-Number formatted as a ColorCode
 */
export function getColorCode(r, g, b) {
  return "#" + ("000000" + rgbToHex(r, g, b)).slice(-6);
}

/**
 * @description Creates A "ColorPicker": HTML Container-Element which containes a set of colored containers.
 * @param {string} id The ID of the ColorPicker container Node.
 * @param {string} defaultColor possible values are: "red", "green", "blue", "yellow"
 * @returns {HTMLDivElement} A container thay contains a set of colored containers
 */
export function createColorPicker(id, defaultColor) {
  const tmpContainer = document.createElement("div");
  tmpContainer.innerHTML = COLORPICKER;
  const colorPicker = tmpContainer.childNodes[0];
  colorPicker.id = id;
  if (defaultColor) {
    const choices = colorPicker.querySelectorAll("div[data-color]");
    Array.prototype.forEach.call(choices, choice => {
      if (choice.getAttribute("data-color") === defaultColor) {
        choice.className += " picked";
      }
    });
  }
  return colorPicker;
}
