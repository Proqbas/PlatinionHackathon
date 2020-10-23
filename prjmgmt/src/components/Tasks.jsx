import React from "react";
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import Task from "./Task"
import TaskList from "./TaskList"

function Tasks() {
  let match = useRouteMatch();

  return (
      <Switch>
        <Route path={`${match.path}/:taskId`}>
          <Task />
        </Route>
        <Route path={match.path}>
          <TaskList />
        </Route>
      </Switch>  );
}

export default Tasks;