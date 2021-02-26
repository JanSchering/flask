import * as React from "react";
import * as ReactDOM from "react-dom";
import Test from "../mdx/test.mdx";
import styles from "../sass/app.module";
import "../sass/global";

console.log("TEST");
const testComponent = param => {
  return (
    <div className={styles.red}>
      {param}
      <Test />
      <button type="button" class="btn btn-primary">
        Button
      </button>
    </div>
  );
};

ReactDOM.render(
  testComponent("test"),
  document.getElementById("root")
);
