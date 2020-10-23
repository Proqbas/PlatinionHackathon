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
      <div>
        <div>
          <h1>Auto Tracker</h1>
          <p>
            One app to rule them all
          </p>
          <div class="row justify-content-between">
            <div class="col-4 element">
              <div class="wrapperSideToSide sectionHeader">
                <div class="left">Status:</div>
                <div class="right projectStatusGreen">on track</div>
              </div>
            </div>
            <div class="col-6 element">
              <div class="sectionHeader">Done vs Undone</div>
            </div>
          </div>

          <div class="clear"></div>

          <div class="row justify-content-between">
            <div class="col-4 element">
              <div class="sectionHeader">Tasks</div>
            </div>
            <div class="col-6">
              <img src="https://www.redmineup.com/cms/assets/thumbnail//32893/1200/burndown.png?token=3aab306e3a0cb67c1c9a058a375b4b46eaebb90ba18ada6e70f056ea38649b77" width="100%"/>
            </div>
          </div>

          <div class="clear"></div>

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

        </div>
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
    );
  }
}

export default Dashboard;
