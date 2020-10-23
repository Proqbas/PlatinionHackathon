
import React from "react";
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import Member from "./Member"
import MemberList from "./MemberList"

function Members() {
  let match = useRouteMatch();

  return (
      <Switch>
        <Route path={`${match.path}/:memberId`}>
          <Member />
        </Route>
        <Route path={match.path}>
          <MemberList />
        </Route>
      </Switch>  );
}

export default Members;