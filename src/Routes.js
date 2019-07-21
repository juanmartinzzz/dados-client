import React from "react";
import { createBrowserHistory } from "history";
import { Switch, Route, Router } from "react-router-dom";
import Layout from "./components/Layout";
import Games from "./components/pages/Games";
import Users from "./components/pages/Users";

const history = createBrowserHistory();

const AppPage = (Component, title) => () => (
  <Layout Component={Component} title={title} />
)

const AppGames = AppPage(Games, "Games Admin");
const AppUsers = AppPage(Users, "Users Admin");

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" component={AppGames} />
      {/* <Route exact path="/users" component={AppUsers} /> */}
    </Switch>
  </Router>
);

export default Routes;
