import React, { Fragment, Component } from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Snackbar, IconButton, Typography } from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import AccountCircle from "@material-ui/icons/AccountCircle";

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  color: rgb(255, 255, 255);
  background-color: rgb(124, 8, 18);
`;

const User = styled.div`
  display: flex;
`;

const StyledAccountCircle = styled(AccountCircle)`
  margin-right: 8px;
`;

const Title = styled.div`
  font-family: "Londrina Shadow";
  color: rgb(255, 255, 255);
  font-size: 44px;
  font-weight: bold;
  text-transform: uppercase;
`;

const Content = styled.div`
  padding: 48px 15%;

  @media only screen and (max-width: 800px) {
    padding: 30px 4%;
  }
`;

class Layout extends Component {
  state = {
    user: {},
    message: null,
    isSnackbarOpen: false
  };

  handleLoadUser = user => {
    this.setState({ user });
  };

  handleOpenSnackbar = message => {
    this.setState({ message, isSnackbarOpen: true });
  };

  handleCloseSnackbar = () => {
    this.setState({ isSnackbarOpen: false });
  };

  render() {
    const { Component, title } = this.props;
    const { user, message, isSnackbarOpen } = this.state;

    return (
      <Fragment>
        <AppBar position="static" color="default">
          <StyledToolbar>
            <Title>{title}</Title>
            {user.name && (
              <User>
                <StyledAccountCircle />
                <Typography variant="subtitle1">{user.name}</Typography>
              </User>
            )}
          </StyledToolbar>
        </AppBar>

        <Content>
          <Component
            handleLoadUser={this.handleLoadUser}
            handleOpenSnackbar={this.handleOpenSnackbar}
          />
        </Content>

        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
          message={<span>{message}</span>}
          action={
            <IconButton color="inherit" onClick={this.handleCloseSnackbar}>
              <Close />
            </IconButton>
          }
        />
      </Fragment>
    );
  }
}

export default Layout;