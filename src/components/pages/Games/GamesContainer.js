import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  upsert,
  onSnapshot,
  getDocsWithId,
  remove,
  get
} from "../../../services/firebase";
import GamesPage from "./GamesPage";

const initialValues = {
  type: "default",
  players: [],
  dice: [null, null, null, null, null]
};

class GamesContainer extends Component {
  state = {
    game: initialValues,
    games: [],
    users: [],
    error: false,
    adding: false,
    refresh: false
  };

  async componentDidMount() {
    this.setState({ refresh: true });

    const users = await get("users", null, -1);
    this.setState({ users });

    onSnapshot("games", null, null, querySnapshot => {
      const games = getDocsWithId(querySnapshot);

      this.setState({ games, refresh: false });
    });
  }

  handlePlayGame = game => {
    this.props.history.push(`/game/${game.id}`);
  };

  handleAdd = () => {
    this.setState({ adding: true });
  };

  handleCancel = () => {
    this.setState({ adding: false, game: initialValues });
  };

  handleChange = ({ target }) => {
    console.log("--name", target.name);
    console.log("--value", target.value);

    const game = { ...this.state.game, [target.name]: target.value };
    this.setState({ game });
  };

  handleUpsert = async () => {
    this.setState({ refresh: true });

    try {
      await upsert("games", this.state.game);

      this.setState({ adding: false, game: initialValues });
    } catch (error) {
      // TODO check error from API to give detailed errors, show errors in fields
      this.setState({ error: true });
      this.props.handleOpenSnackbar(
        `There was an Error creating the Game ${error}`
      );
    }
  };

  handleDelete = async game => {
    try {
      this.setState({ refresh: true });

      await remove("games", game.id);
    } catch (error) {
      // TODO check error from API to give detailed referential integrity errors
      this.props.handleOpenSnackbar(`There was an Error removing ${game.name}`);
    }
  };

  render() {
    const { game, games, users, error, adding, refresh } = this.state;

    return (
      <GamesPage
        game={game}
        games={games}
        users={users}
        error={error}
        adding={adding}
        loading={refresh}
        handleAdd={this.handleAdd}
        handleCancel={this.handleCancel}
        handleDelete={this.handleDelete}
        handleUpsert={this.handleUpsert}
        handleChange={this.handleChange}
        handlePlayGame={this.handlePlayGame}
      />
    );
  }
}

export default withRouter(GamesContainer);
