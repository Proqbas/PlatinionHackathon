import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from 'react-bootstrap/Button'
/**
 * Dashboard bar component
 *
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {
  /**
   * Creates an instance of Dashboard.
   * @param {Object} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Jumbotron>
        <h1>Hello, world!</h1>
        <p>
          This is a simple starting page, but for sure it will impress the jury!
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>
    );
  }
}

export default Dashboard;
