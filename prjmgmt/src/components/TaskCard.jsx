import React, { Component } from "react";
import Tasks from "./Tasks";

/**
 * TaskCard component
 *
 * @class TaskCard
 * @extends {Component}
 */
class TaskCard extends Component {
  /**
   * Creates an instance of Members.
   * @param {Object} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <React.Fragment>
        <div class="sectionHeader">Tasks</div>
        <Tasks />
      </React.Fragment>
    )
  }
}

export default TaskCard;
