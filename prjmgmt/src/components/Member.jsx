import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const api = require("../api-service");

/**
 * Member component
 *
 * @class Member
 * @extends {Component}
 */
class Member extends Component {
  /**
   * Creates an instance of Member.
   * @param {Object} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {
      member: {}
    };

  }

  getMember(id) {
    api
      .getMember(id)
      .then((member) => this.setState({ member }))
      .catch((error) => console.log(error));
  }


  componentDidMount() {
    this.getMember(this.props.match.params.id);
  }

  render() {
    return (
      <React.Fragment>
        This is the member page for {this.props.match.params.questionId}
      </React.Fragment>
    );
  }
}

export default withRouter(Member);
