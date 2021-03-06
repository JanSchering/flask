import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { history } from "../../utils/history";
import styles from "../../../sass/app.module";
import "../../../sass/global";
import Home from "../../../mdx/Home.mdx";
import Projects from "../../../mdx/Projects.mdx";
import { Navbar } from "../../components/navbar";
import { MDXProvider } from "@mdx-js/react";
import { MDBJumbotron, MDBContainer } from "mdbreact";

const Wrapper = props => {
  console.log(props);

  return (
    <MDBJumbotron fluid>
      <MDBContainer>
        <main {...props} />
      </MDBContainer>
    </MDBJumbotron>
  );
};

export const App = () => {
  return (
    <BrowserRouter history={history}>
      <Navbar />
      <div className="pageContainer">
        <Switch>
          <Route exact path={["/", "/index", "/home"]}>
            <MDXProvider components={{ wrapper: Wrapper }}>
              <Home />
            </MDXProvider>
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
      </div>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("root"));
