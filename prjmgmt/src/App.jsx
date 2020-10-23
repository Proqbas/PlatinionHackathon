import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Navigation from "./components/Navigation"
import Footer from "./components/Footer"
import Dashboard from "./components/Dashboard"
import Skills from "./components/Skills"
import Tasks from "./components/Tasks"
import Members from "./components/Members"


/**
 * General React App component.
 * App is a general wrapper.
 *
 * @class App
 * @extends {Component}
 */

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lang: "en",
    };
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <div class="clear"></div>
        <div class="container">
          <Switch>
            <Route path="/skills"><Skills /></Route>
            <Route path="/members"><Members /></Route>
            <Route path="/tasks"><Tasks /></Route>
            <Route path="/"><Dashboard /></Route>
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
