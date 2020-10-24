import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Col, Row, Card, ProgressBar, Table } from "react-bootstrap";
import {
  Binoculars,
  CheckCircle,
  Play,
  QuestionCircle,
} from "react-bootstrap-icons";

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
      task: {},
    };

    this.assignMembers = this.assignMembers.bind(this);
  }

  getTask(id) {
    api
      .getTask(id)
      .then((task) => this.setState({ task }))
      .catch((error) => console.log(error));
  }

  assignMembers(id) {
    api
      .assignMembers(id)
      .then(() => this.getTask(this.props.match.params.taskId))
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getTask(this.props.match.params.taskId);
  }

  render() {
    let skills = [];

    let icon = "";
    let assignment = "";

    if (this.state.task.skills) {
      skills = this.state.task.skills.map((skill) => {
        let level = (skill.level / 5) * 100;
        return (
          <tr>
            <td>{skill.name}</td>
            <td>
              <ProgressBar now={level} />
            </td>
          </tr>
        );
      });
    }

    switch (this.state.task.status) {
      case "OPEN":
        icon = <Binoculars />;
        assignment = (
          <Card.Body>
            <Card.Link onClick={() => this.assignMembers(this.state.task.id)}>
              Assign Members Link
            </Card.Link>
          </Card.Body>
        );
        break;
      case "IN PROGRESS":
        icon = <Play />;
        break;
      case "DONE":
        icon = <CheckCircle className="text-success" />;
        break;
      default:
        icon = <QuestionCircle />;
    }

    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  {this.state.task.name} {icon}{" "}
                </Card.Title>
                <Card.Text>{this.state.task.desc}</Card.Text>
              </Card.Body>
              {assignment}
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Text>
                  <Table>{skills}</Table>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default withRouter(Task);
