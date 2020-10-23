import React, { Component } from "react";
import Table from "react-bootstrap/Table";

/**
 * Members bar component
 *
 * @class Members
 * @extends {Component}
 */
class Members extends Component {
  /**
   * Creates an instance of Members.
   * @param {Object} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {
      members: [],
    };
  }

  getMembers() {
    let members = [
      { id: 1, name: "Peter" },
      { id: 2, name: "Captain" },
    ];

    this.setState({ members });
  }

  componentDidMount() {
    this.getMembers();
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {this.state.members.map((member) => {
            return (
              <tr>
                <td>{member.id}</td>
                <td>{member.name}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default Members;
