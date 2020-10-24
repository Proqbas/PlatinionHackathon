import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Col,
  Row,
  Card,
  ProgressBar,
  Table,
  Button,
  ListGroup
} from "react-bootstrap";
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

    let tags = "";
    let icon = "";
    let assignment = "";
    let assignedMembers = "";

    if (this.state.task.skills) {
      skills = this.state.task.skills.map((skill) => {
        let level = (skill.level / 5) * 100;
        return (
          <tr>
            <td>{skill.name}</td>
            <td>
              <ProgressBar striped now={level} />
            </td>
            <td>{skill.level}/5</td>
          </tr>
        );
      });
    }

    if (this.state.task.assignee) {
      assignedMembers = (
        <Table hover>
          <thead>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Match</td>
            </tr>
          </thead>
          <tbody>
            {this.state.task.assignee.map((assignee) => {
              return (
                <tr>
                  <td>{assignee.id}</td>
                  <td>{assignee.name}</td>
                  <td>Perfect match!</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    }

    if (this.state.task.suggested_keywords) {
      tags = (
        <ListGroup>
          {this.state.task.suggested_keywords.map((keyword) => (
            <ListGroup.Item>keyword</ListGroup.Item>
          ))}
        </ListGroup>
      );
    }

    switch (this.state.task.status) {
      case "OPEN":
        icon = <Binoculars />;
        assignment = (
          <Card.Body>
            <Button onClick={() => this.assignMembers(this.state.task.id)}>
              Assign Members to Task
            </Button>
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
              {tags}
              {assignment}
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Text>
                  <Table hover>
                    <thead>
                      <tr>
                        <th>Skill</th>
                        <th>Required Proficiency Level</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>{skills}</tbody>
                  </Table>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>{assignedMembers}</Row>
      </React.Fragment>
    );
  }
}

export default withRouter(Task);
