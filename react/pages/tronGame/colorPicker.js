import { COLORPICKER } from "./literals";

export class ColorPicker {
  constructor(defaultColor) {
    this.color = defaultColor;
    this.domNode = generateNode(defaultColor);
    colorPickerListener.bind(this)();
  }

  setColor(color) {
    this.color = color;
  }

  getColor() {
    return this.color;
  }
}

const generateNode = color => {
  const tmpContainer = document.createElement("div");
  tmpContainer.innerHTML = COLORPICKER;
  const colorPicker = tmpContainer.childNodes[0];
  if (color) {
    const choices = colorPicker.querySelectorAll("div[data-color]");
    Array.prototype.forEach.call(choices, choice => {
      if (choice.getAttribute("data-color") === color) {
        choice.className += " picked";
      }
    });
  }
  return colorPicker;
};

/**
 * @returns {(HTMLDivElement) => {}} A function that creates a listener on a given ColorPicker-Element.
 */
const colorPickerListener = function() {
  const pickerChoices = this.domNode.querySelectorAll(
    ".pickerChoice"
  );
  Array.prototype.forEach.call(pickerChoices, choice => {
    choice.addEventListener("click", e => {
      const prevPicked = this.domNode.querySelector(
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
