import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const api = require("../api-service");

/**
 * Task component
 *
 * @class Task
 * @extends {Component}
 */
class Task extends Component {
  /**
   * Creates an instance of Task.
   * @param {Object} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {
      member: {}
    };

  }

  getTask(id) {
    api
      .getTask(id)
      .then((task) => this.setState({ task }))
      .catch((error) => console.log(error));
  }


  componentDidMount() {
    this.getTask(this.props.match.params.taskId);
  }

  render() {
    return (
      <React.Fragment>
        This is the task page for {this.props.match.params.taskId}
      </React.Fragment>
    );
  }
}

export default withRouter(Task);
