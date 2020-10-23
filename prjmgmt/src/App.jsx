import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Footer />
      </div>
    );
  }
}

export default App;
