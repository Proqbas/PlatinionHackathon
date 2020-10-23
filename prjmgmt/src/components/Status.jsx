import React, { Component } from "react";
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
      <div class="wrapperSideToSide sectionHeader">
          <div class="left">Status:</div>
          <div class="right projectStatusGreen">on track</div>
      </div>
    );
  }
}

export default Status;
