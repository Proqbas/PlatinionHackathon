import React, { Component } from "react";
import Table from "react-bootstrap/Table";

const api = require("../api-service");

/**
 * Skills bar component
 *
 * @class Skills
 * @extends {Component}
 */
class Skills extends Component {
  /**
   * Creates an instance of Skills.
   * @param {Object} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
    };
  }

  componentDidMount() {
    api
      .getSkills()
      .then((skills) => this.setState({ skills }))
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {this.state.skills.map((skill) => {
            return (
              <tr>
                <td>{skill.id}</td>
                <td>{skill.name}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default Skills;
