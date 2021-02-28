import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { history } from "./utils/history";
import styles from "../sass/app.module";
import "../sass/global";
import Home from "../mdx/Home.mdx";

export const App = () => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route
          path="/test"
          component={() => {
            window.location.href = "https://www.github.com";
            return null;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("root"));
