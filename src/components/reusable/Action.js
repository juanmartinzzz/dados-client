import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";

const Action = ({ title, onClick, Icon }) => (
  <IconButton
    size="small"
    onClick={event => {
      event.stopPropagation();
      onClick();
    }}
  >
    <Tooltip title={title}>
      <Icon fontSize="small" />
    </Tooltip>
  </IconButton>
);

export default Action;
