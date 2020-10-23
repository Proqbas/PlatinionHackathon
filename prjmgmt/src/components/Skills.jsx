import React from "react";
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import Skill from "./Skill"
import SkillList from "./SkillList"

function Skills() {
  let match = useRouteMatch();

  return (
      <Switch>
        <Route path={`${match.path}/:skillId`}>
          <Skill />
        </Route>
        <Route path={match.path}>
          <SkillList />
        </Route>
      </Switch>  );
}

export default Skills;