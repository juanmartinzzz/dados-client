import React, { Fragment } from "react";
import Table from "../../reusable/Table";
import Action from "../../reusable/Action";
import { Button, Select, MenuItem, Typography } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";

const muiColorMap = {
  forced: "secondary",
  default: "textPrimary",
};

const getTableData = ({
  game,
  games,
  error,
  handleDelete,
  handleChange
}) => ({
  headers: {
    id: {},
    players: {},
    type: {},
    finished: {},
    actions: {
      align: "right"
    }
  },
  inputs: {
    type: (
      <Select
        name="type"
        error={error}
        value={game.type}
        onChange={handleChange}
        key={Math.random()}
      >
        <MenuItem value="default">
          <Typography color={muiColorMap.default}>Default</Typography>
        </MenuItem>
        <MenuItem value="forced">
          <Typography color={muiColorMap.forced}>Forced</Typography>
        </MenuItem>
      </Select>
    )
  },
  rows: games.map(game => ({
    ...game,
    players: game.players.map(player => <span key={Math.random()}>{player}</span>),
    type: <Typography color={muiColorMap[game.type]}>{game.type.toUpperCase()}</Typography>,
    finished: "NO",
    actions: (
      <Action
        title={`Remove ${game.id}`}
        onClick={() => handleDelete(game)}
        Icon={Delete}
        key={Math.random()}
      />
    )
  }))
});

const GamesPage = ({
  game,
  games,
  error,
  adding,
  loading,
  handleAdd,
  handleCancel,
  handleDelete,
  handleUpsert,
  handleChange,
  handlePlayGame
}) => (
  <Table
    title="Games"
    adding={adding}
    loading={loading}
    actions={
      <span>
        <Button
          variant="contained"
          onClick={adding ? handleUpsert : handleAdd}
          color={adding ? "primary" : "default"}
        >
          {adding ? "SAVE" : "NEW GAME"}
        </Button>
        {adding &&
          (<Fragment>
            &nbsp; &nbsp; &nbsp;
            <Button
              variant="contained"
              onClick={handleCancel}
            >
              CANCEL
            </Button>
          </Fragment>
          )
        }
      </span>
    }
    rowClick={handlePlayGame}
    tableData={getTableData({
      game,
      games,
      error,
      handleDelete,
      handleChange
    })}
  />
);

export default GamesPage;