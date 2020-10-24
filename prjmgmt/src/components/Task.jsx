import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Table from "react-bootstrap/Table";

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
      task: { skills: [] }
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
        <h2>{this.state.task.name} - required skills</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Skill</th>
            </tr>
          </thead>
          <tbody>
            {this.state.task.skills.map((skill) => {
              return (
                <tr>
                  <td>{skill.id}</td>
                  <td>{skill.name}</td>                
                </tr>
              );
            })}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}

export default withRouter(Task);
