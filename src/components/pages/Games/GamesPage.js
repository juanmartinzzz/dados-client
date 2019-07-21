import React, { Fragment } from "react";
import Table from "../../reusable/Table";
import Action from "../../reusable/Action";
import { TextField, Button } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";

const getTableData = ({
  user,
  users,
  error,
  handleEdit,
  handleDelete,
  handleChange
}) => ({
  headers: {
    name: {},
    email: {},
    tasks: {
      align: "right"
    },
    actions: {
      align: "right"
    }
  },
  inputs: {
    name: (
      <TextField
        fullWidth
        error={error}
        name="name"
        value={user.name}
        onChange={handleChange}
      />
    ),
    email: (
      <TextField
        fullWidth
        error={error}
        name="email"
        value={user.email}
        onChange={handleChange}
      />
    )
  },
  rows: users.map(user => ({
    ...user,
    tasks: user.tasks.length,
    actions: (
      <Fragment>
        <Action
          title={`Edit ${user.name}`}
          onClick={() => handleEdit(user)}
          Icon={Edit}
        />
        <Action
          title={`Remove ${user.name}`}
          onClick={() => handleDelete(user)}
          Icon={Delete}
        />
      </Fragment>
    )
  }))
});

const GamesPage = ({
  user,
  users,
  error,
  adding,
  loading,
  handleAdd,
  handleEdit,
  handleDelete,
  handleUpsert,
  handleChange,
  handleUserDetail
}) => (
  <Table
    title="Games"
    adding={adding}
    loading={loading}
    actions={
      <Button
        onClick={adding ? handleUpsert : handleAdd}
        variant={adding ? "contained" : "text"}
        color={adding ? "primary" : "default"}
      >
        {adding ? "SAVE" : "NEW GAME"}
      </Button>
    }
    rowClick={handleUserDetail}
    tableData={getTableData({
      user,
      users,
      error,
      handleEdit,
      handleDelete,
      handleChange
    })}
  />
);

export default GamesPage;