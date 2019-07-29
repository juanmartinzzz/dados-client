import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  upsert,
  onSnapshot,
  getDocsWithId,
  remove
} from "../../../services/firebase";
import UsersPage from "./UsersPage";

const initialValues = {
  name: "",
  email: ""
};

class UsersContainer extends Component {
  state = {
    user: initialValues,
    users: [],
    error: false,
    adding: false,
    refresh: false
  };

  componentDidMount() {
    this.setState({ refresh: true });

    onSnapshot("users", null, null, querySnapshot => {
      const users = getDocsWithId(querySnapshot);

      this.setState({ users, refresh: false });
    });
  }

  handleAdd = () => {
    this.setState({ adding: true });
  };

  handleCancel = () => {
    this.setState({ adding: false, user: initialValues });
  };

  handleChange = ({ target }) => {
    const user = { ...this.state.user, [target.name]: target.value };
    this.setState({ user });
  };

  handleEdit = user => {
    this.setState({ user, adding: true });
  };

  handleUpsert = async () => {
    this.setState({ refresh: true });

    try {
      await upsert("users", this.state.user);

      this.setState({ adding: false, user: initialValues });
    } catch (error) {
      // TODO check error from API to give detailed errors, show errors in fields
      this.setState({ error: true });
      this.props.handleOpenSnackbar(
        `There was an Error creating the User: ${error}`
      );
    }
  };

  handleDelete = async user => {
    try {
      this.setState({ refresh: true });

      await remove("users", user.id);
    } catch (error) {
      // TODO check error from API to give detailed referential integrity errors
      this.props.handleOpenSnackbar(`There was an Error removing ${user.name}`);
    }
  };

  render() {
    const { user, users, error, adding, refresh } = this.state;

    return (
      <UsersPage
        user={user}
        users={users}
        error={error}
        adding={adding}
        loading={refresh}
        handleAdd={this.handleAdd}
        handleEdit={this.handleEdit}
        handleCancel={this.handleCancel}
        handleDelete={this.handleDelete}
        handleUpsert={this.handleUpsert}
        handleChange={this.handleChange}
      />
    );
  }
}

export default withRouter(UsersContainer);
