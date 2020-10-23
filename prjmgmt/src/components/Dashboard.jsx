import React, { Component } from "react";
import Button from "react-bootstrap/Button";

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
          
          <div class="clear"></div>

        </div>
      </div>

      <div class="clear"></div>

      <div class="row justify-content-between">
        <div class="col-4 element">
          <Status />
        </div>
        <div class="col-6 element">
          <div class="sectionHeader">Burndown chart</div>
        </div>
      </div>
      
      <div class="clear"></div>

      <div class="row justify-content-between">
        <div class="col-4 element">
          <TaskCard />
        </div>
        <div class="col-6 element">
          <Burndown />
        </div>
      </div>

      <div class="clear"></div>

      <div class="row justify-content-between">
        <div class="col-4">
          
        </div>
        <div class="col-6 element">
          <MemberCard />
        </div>
      </div>
      
      <div class="clear"></div>

      <p>
        <Button
          onClick={() =>
            alert("Launching Glue!")
          }
          variant="primary"
        >
          Jump to VR
        </Button>
      </p>

      </React.Fragment>
    );
  }
}

export default Dashboard;
