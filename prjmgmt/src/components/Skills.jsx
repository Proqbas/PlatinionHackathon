import React, { Component } from "react";
import Table from "react-bootstrap/Table";

const DataService = require("../service.js");
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

  getSkills() {
    // DataService.listSkills()
    // .then(skills => {
    //   skills.map(skill => (skill.actions = skill.uuid));
    //   this.setState({skills});
    //   return;
    // })
    // .catch(error => {
    //   return;
    // });
    let skills = [{ name: "Java" }, { name: "Python" }];

    this.setState({ skills });
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
