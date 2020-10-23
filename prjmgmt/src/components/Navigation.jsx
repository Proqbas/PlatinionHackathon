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
      <Nav
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>
          <Nav.Link href="/home"> Dashboard </Nav.Link>{" "}
        </Nav.Item>{" "}
        <Nav.Item>
          <Nav.Link eventKey="/skills"> Skills </Nav.Link>{" "}
        </Nav.Item>{" "}
        <Nav.Item>
          <Nav.Link eventKey="/members"> Members </Nav.Link>{" "}
        </Nav.Item>{" "}
      </Nav>
    );
  }
}

export default Navigation;
