import React, { Component } from "react";
import Card from "react-bootstrap/Card";
/**
 * Status component
 *
 * @class Status
 * @extends {Component}
 */
class Status extends Component {
  /**
   * Creates an instance of MemberCard.
   * @param {Object} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {
      status: {},
    };
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Project status</Card.Title>
          <Card.Text>Traffic light</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Status;
