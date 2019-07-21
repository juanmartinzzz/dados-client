import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UsersPage from "./UsersPage";
import ApiService from "../../../services/ApiService";

const apiService = new ApiService();

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

  async componentDidMount() {
    this.setState({ refresh: true });
  }

  async componentDidUpdate(prevProps, { refresh: prevRefresh }) {
    const { refresh } = this.state;

    if (refresh && !prevRefresh) {
      const users = await apiService.get("/users", { sort: "name" });
      this.setState({ users, refresh: false });
    }
  }

  handleUserDetail = user => {
    this.props.history.push(`/tasks/${user.id}`);
  };

  handleAdd = () => {
    this.setState({ adding: true });
  };

  handleEdit = user => {
    this.setState({ adding: true, user });
  };

  handleChange = ({ target }) => {
    const user = { ...this.state.user, [target.name]: target.value };
    this.setState({ user });
  };

  handleUpsert = async () => {
    const { user } = this.state;

    try {
      if (!user.id) {
        await apiService.post("/users", user);
      } else {
        await apiService.patch(`/users/${user.id}`, {
          name: user.name,
          email: user.email
        });
      }
      this.setState({
        adding: false,
        error: false,
        refresh: true,
        user: initialValues
      });
    } catch (error) {
      // TODO check error from API to give detailed errors, show errors in fields
      this.setState({ error: true });
      this.props.handleOpenSnackbar("There was an Error creating the User");
    }
  };

  handleDelete = async user => {
    if (user.tasks.length > 0) {
      this.props.handleOpenSnackbar(
        `Can't remove ${user.name}; please remove their ${user.tasks.length} Tasks first.`
      );
      return;
    }

    try {
      await apiService.delete(`/users/${user.id}`);
      this.setState({ refresh: true });
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
        handleDelete={this.handleDelete}
        handleUpsert={this.handleUpsert}
        handleChange={this.handleChange}
        handleUserDetail={this.handleUserDetail}
      />
    );
  }
}

export default withRouter(UsersContainer);