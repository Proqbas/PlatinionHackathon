import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { ArrowUpRightSquare, XCircle } from "react-bootstrap-icons";

const api = require("../api-service");

/**
 * MembersList component
 *
 * @class MembersList
 * @extends {Component}
 */
class MembersList extends Component {
  /**
   * Creates an instance of MembersList.
   * @param {Object} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {
      members: [],
    };

    this.deleteMember = this.deleteMember.bind(this);
  }

  getMembers() {
    api
      .getMembers()
      .then((members) => this.setState({ members }))
      .catch((error) => console.log(error));
  }

  deleteMember(id) {
    if (id < 1) {
      console.log("Error while deleting");
    }

    let confirmation = window.confirm(
      "Are you sure you wish to remove the Member?"
    );

    if (confirmation) {
      api
        .deleteMember(id)
        .then(() => {
          this.getMembers();
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
  }

  componentDidMount() {
    this.getMembers();
  }

  render() {
    return (
      <React.Fragment>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.members.map((member) => {
              return (
                <tr>
                  <td>{member.id}</td>
                  <td>{member.name}</td>
                  <td>
                    <Link to={`/members/${member.id}`}>
                      <Button variant="primary">
                        <ArrowUpRightSquare /> Details
                      </Button>
                    </Link>
                    <Button
                      onClick={() => this.deleteMember(member.id)}
                      variant="primary"
                    >
                      <XCircle /> Delete
                    </Button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <div class="clear"></div>

        <div>
          <img alt="Member Map" src={require("../media/peopleMap2.png")} height="600px" />
        </div>

        <div class="clear"></div>
      </React.Fragment>
    );
  }
}

export default withRouter(MembersList);
