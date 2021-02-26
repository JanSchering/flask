import * as React from "react";
import * as ReactDOM from "react-dom";

console.log(React);
console.log("TEST");
const testComponent = param => {
  return <div>{param}</div>;
};

ReactDOM.render(testComponent("test"), document.getElementById("root"));
