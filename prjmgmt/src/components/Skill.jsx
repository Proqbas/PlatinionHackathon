import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const api = require("../api-service");

/**
 * Skill component
 *
 * @class Skill
 * @extends {Component}
 */
class Skill extends Component {
  /**
   * Creates an instance of Skill.
   * @param {Object} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {
      member: {}
    };

  }

  getSkill(id) {
    api
      .getSkill(id)
      .then((skill) => this.setState({ skill }))
      .catch((error) => console.log(error));
  }


  componentDidMount() {
    this.getSkill(this.props.match.params.skillId);
  }

  render() {
    return (
      <React.Fragment>
        This is the skill page for {this.props.match.params.skillId}
      </React.Fragment>
    );
  }
}

export default withRouter(Skill);
