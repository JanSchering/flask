import * as React from "react";
import * as ReactDOM from "react-dom";
import Test from "../mdx/test.mdx";

console.log("TEST");
const testComponent = param => {
  return (
    <div>
      {param}
      <Test />
    </div>
  );
};

ReactDOM.render(
  testComponent("test"),
  document.getElementById("root")
);
