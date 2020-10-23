import React, { Component } from "react";
import Card from "react-bootstrap/Card";
/**
 * Mermber Card component
 *
 * @class MemberCard
 * @extends {Component}
 */
class MemberCard extends Component {
  /**
   * Creates an instance of MemberCard.
   * @param {Object} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {
      members: [],
    };
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Team Members</Card.Title>
          <Card.Text>Here are the team members</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">0/0 members currently available</small>
        </Card.Footer>
      </Card>
    );
  }
}

export default MemberCard;
