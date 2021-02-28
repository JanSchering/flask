import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { history } from "../../utils/history";
import styles from "../../../sass/app.module";
import "../../../sass/global";
import Home from "../../../mdx/Home.mdx";
import Projects from "../../../mdx/Projects.mdx";
import { Navbar } from "../../components/navbar";

export const App = () => {
  return (
    <BrowserRouter history={history}>
      <Navbar />
      <Switch>
        <Route exact path={["/", "/index", "/home"]}>
          <Home />
        </Route>
        <Route exact path="/projects">
          <Projects />
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
