import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";

/**
 * Navigation bar component
 *
 * @class Navigation
 * @extends {Component}
 */
class Navigation extends Component {
  /**
   * Creates an instance of Navigation.
   * @param {Object} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {
      active: "home",
    };
  }

  render() {
    return (
      <Nav activeKey="/">
        <Nav.Item>
          <Nav.Link href="/"> Dashboard </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/tasks"> Tasks </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/skills"> Skills </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/members"> Members </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}

export default Navigation;
