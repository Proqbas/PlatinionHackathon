import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
/**
 * Burndown component
 *
 * @class Burndown
 * @extends {Component}
 */
class Burndown extends Component {
  /**
   * Creates an instance of MemberCard.
   * @param {Object} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {
        chart: {}
    };
  }

  render() {
    return(
        <Card>
        <Card.Body>
          <Card.Title>Burndown chart</Card.Title>
          <Card.Text>
            Fancy chart!
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default Burndown;
