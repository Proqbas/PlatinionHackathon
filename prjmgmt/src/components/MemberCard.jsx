import React, { Component } from "react";
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
      <React.Fragment>
        <div class="sectionHeader">Team Members</div>
        <div>Here are the team members</div>
        <div>
          <small className="text-muted">0/0 members currently available</small>
        </div>
      </React.Fragment>
    );
  }
}

export default MemberCard;
