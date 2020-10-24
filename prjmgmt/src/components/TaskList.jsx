import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { ArrowUpRightSquare, XCircle } from "react-bootstrap-icons";

const api = require("../api-service");

/**
 * TaskList component
 *
 * @class TaskList
 * @extends {Component}
 */
class TaskList extends Component {
  /**
   * Creates an instance of TaskList.
   * @param {Object} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };

    this.deleteTask = this.deleteTask.bind(this);
  }

  getTasks() {
    api
      .getTasks()
      .then((tasks) => this.setState({ tasks }))
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getTasks();
  }

  deleteTask(id) {
    if (id < 1) {
      console.log("Error while deleting");
    }

    let confirmation = window.confirm(
      "Are you sure you wish to remove the question?"
    );

    if (confirmation) {
      api
        .deleteTask(id)
        .then(() => {
          this.getTasks();
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.tasks.map((task) => {
            return (
              <tr>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.status}</td>
                <td>
                  <Link to={`/tasks/${task.id}`}>
                    <Button variant="primary">
                      <ArrowUpRightSquare /> Details
                    </Button>
                  </Link>
                  <Button
                    onClick={() => this.deleteTask(task.id)}
                    variant="primary"
                  >
                    <XCircle /> Delete
                  </Button>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default withRouter(TaskList);
