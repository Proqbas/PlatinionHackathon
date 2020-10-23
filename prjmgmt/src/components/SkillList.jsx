import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { ArrowUpRightSquare, XCircle } from "react-bootstrap-icons";

const api = require("../api-service");

/**
 * SkillList bar component
 *
 * @class SkillList
 * @extends {Component}
 */
class SkillList extends Component {
  /**
   * Creates an instance of SkillList.
   * @param {Object} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
    };

    this.deleteSkill = this.deleteSkill.bind(this);
  }

  getSkills() {
    api
      .getSkills()
      .then((skills) => this.setState({ skills }))
      .catch((error) => console.log(error));
  }

  deleteSkill(id) {
    if (id < 1) {
      console.log("Error while deleting");
    }

    let confirmation = window.confirm(
      "Are you sure you wish to remove the Skill?"
    );

    if (confirmation) {
      api
        .deleteSkill(id)
        .then(() => {
          this.getSkills();
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
  }

  componentDidMount() {
    this.getSkills();
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.state.skills.map((skill) => {
            return (
              <tr>
                <td>{skill.id}</td>
                <td>{skill.name}</td>
                <td>
                  <Link to={`/skill/${skill.id}`}>
                    <Button variant="primary">
                      <ArrowUpRightSquare /> Details
                    </Button>
                  </Link>
                  <Button
                    onClick={() => this.deleteSkill(skill.id)}
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

export default withRouter(SkillList);
