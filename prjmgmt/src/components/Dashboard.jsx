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
      <div>
        <div>
          <h1>Auto Tracker</h1>
          <p>
            One app to rule them all
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </div>
        <div class="element">TEST ELEMENT</div>
      </div>
    );
  }
}

export default Dashboard;
