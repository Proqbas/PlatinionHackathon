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
      <img src="https://www.redmineup.com/cms/assets/thumbnail//32893/1200/burndown.png?token=3aab306e3a0cb67c1c9a058a375b4b46eaebb90ba18ada6e70f056ea38649b77" width="100%" height="95%"/>
    )
  }
}

export default Burndown;
