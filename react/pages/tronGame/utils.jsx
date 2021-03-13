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
