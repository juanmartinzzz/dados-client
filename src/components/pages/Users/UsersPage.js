import React, { Fragment } from "react";
import Table from "../../reusable/Table";
import Action from "../../reusable/Action";
import {
  Button,
  Select,
  MenuItem,
  Typography,
  TextField
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";

const muiColorMap = {
  forced: "secondary",
  default: "textPrimary"
};

const getTableData = ({
  user,
  users,
  error,
  handleEdit,
  handleDelete,
  handleChange
}) => ({
  headers: {
    id: {},
    name: {},
    email: {},
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

const UsersPage = ({
  user,
  users,
  error,
  adding,
  loading,
  handleAdd,
  handleEdit,
  handleCancel,
  handleDelete,
  handleUpsert,
  handleChange,
  handlePlayGame
}) => (
  <Table
    title="Users"
    adding={adding}
    loading={loading}
    actions={
      <span>
        <Button
          variant="contained"
          onClick={adding ? handleUpsert : handleAdd}
          color={adding ? "primary" : "default"}
        >
          {adding ? "SAVE" : "NEW USER"}
        </Button>
        {adding && (
          <Fragment>
            &nbsp; &nbsp; &nbsp;
            <Button variant="contained" onClick={handleCancel}>
              CANCEL
            </Button>
          </Fragment>
        )}
      </span>
    }
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

export default UsersPage;
