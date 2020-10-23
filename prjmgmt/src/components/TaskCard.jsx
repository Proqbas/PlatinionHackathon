import React, { Component } from "react";
import Card from "react-bootstrap/Card"
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
        <Card>
        <Card.Body>
          <Card.Title>Tasks</Card.Title>
          <Card.Text>
            <Tasks />
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default TaskCard;
