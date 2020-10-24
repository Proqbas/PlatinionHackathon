import React, { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { BookmarkCheck, BookmarkX } from "react-bootstrap-icons";
import avatar from "../media/avatar.png";

const api = require("../api-service");

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

    this.getAvailability = this.getAvailability.bind(this);
  }

  getMembers() {
    api
      .getMembers()
      .then((members) => this.setState({ members }))
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getMembers();
  }

  getAvailability(member) {
    if (member.assigned_to === undefined || member.assigned_to.length === 0) {
      return (
        <span>
          <BookmarkCheck className="text-success" /> Available
        </span>
      );
    } else {
      return (
        <span>
          <BookmarkX className="text-danger" /> Not available
        </span>
      );
    }
  }

  render() {
    return (
      <Row>
        {this.state.members.map((member) => {
          return (
            <Col>
              <Card>
                <Card.Img variant="top" src={avatar} />
                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Text>{this.getAvailability(member)}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  }
}

export default MemberCard;
