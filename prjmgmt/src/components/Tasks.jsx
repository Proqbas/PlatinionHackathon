import React, { Component } from "react";
import Table from "react-bootstrap/Table";
/**
 * Tasks bar component
 *
 * @class Tasks
 * @extends {Component}
 */
class Tasks extends Component {
  /**
   * Creates an instance of Tasks.
   * @param {Object} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  getTasks() {
    let tasks = [
      { id: 1, desc: "Update of Financials" },
      { id: 2, desc: "Update Business Plan" },
    ];

    this.setState({ tasks });
  }

  componentDidMount() {
    this.getTasks();
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {this.state.tasks.map((task) => {
            return (
              <tr>
                <td>{task.id}</td>
                <td>{task.desc}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default Tasks;
