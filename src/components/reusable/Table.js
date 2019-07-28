import React from "react";
import styled from "styled-components";
import {
  Table as MuiTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Toolbar as MuiToolbar,
  Typography,
  LinearProgress,
  Button
} from "@material-ui/core";

const StyledTableCell = styled(TableCell)`
  text-transform: capitalize;
`;

const StyledToolbar = styled(MuiToolbar)`
  display: flex;
  justify-content: space-between;
`;

const StyledTableRow = styled(TableRow)`
  cursor: ${props => (props.onClick ? "pointer" : "default")};
`;

const Toolbar = ({ title, actions }) => (
  <StyledToolbar>
    <Typography variant="h6" id="tableTitle">
      {title}
    </Typography>

    {actions}
  </StyledToolbar>
);

const InputsRow = ({ headers, inputs, adding }) => {
  if (adding && inputs) {
    return (
      <TableRow>
        {Object.keys(headers).map(key => (
          <TableCell {...headers[key]} key={key}>
            {inputs[key]}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  return null;
};

const Row = ({ headers, row, rowClick }) => (
  <StyledTableRow onClick={rowClick ? () => rowClick(row) : null} hover>
    {Object.keys(row).map(
      key =>
        headers[key] && (
          <TableCell {...headers[key]} key={key}>
            {row[key]}
          </TableCell>
        )
    )}
  </StyledTableRow>
);

const Table = ({ title, adding, loading, actions, rowClick, tableData }) => {
  const { headers, inputs, rows } = tableData;

  return (
    <Paper>
      <Toolbar title={title} actions={actions} />

      <MuiTable size="small">
        <TableHead>
          <TableRow>
            {Object.keys(headers).map(key => (
              <StyledTableCell {...headers[key]} key={key}>
                {key}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          <InputsRow
            adding={adding}
            headers={headers}
            inputs={inputs}
          ></InputsRow>
          {rows.map((row, index) => (
            <Row row={row} headers={headers} rowClick={rowClick} key={index} />
          ))}
        </TableBody>
      </MuiTable>
      {loading && <LinearProgress />}
    </Paper>
  );
};

export default Table;
