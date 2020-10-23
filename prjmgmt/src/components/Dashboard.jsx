import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TaskCard from "./TaskCard";
import Status from "./Status";
import Burndown from "./Burndown";
import MemberCard from "./MemberCard";

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
      <React.Fragment>
        <div class="element">TEST ELEMENT</div>
        <div>
          <Jumbotron>
            <h1>Hello Platinions!</h1>
            <p>
              This is a simple starting page, but for sure it will impress the
              jury!
            </p>
            <p>
              <Button
                onClick={() =>
                  alert("But honestly, they don't need a function")
                }
                variant="primary"
              >
                There are buttons to press
              </Button>
            </p>
          </Jumbotron>
          </div>
        <Row>
          <Col>
            <Status />
          </Col>
          <Col>
            <Burndown />
          </Col>
        </Row>
        <Row>
          <Col>
            <TaskCard />
          </Col>
          <Col>
            <MemberCard />
          </Col>
        </Row>
      </React.Fragment>
  }
}

export default Dashboard;
