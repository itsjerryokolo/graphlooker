import React, { useEffect } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { GraphDataTableProps } from "./../../utility/interface/props";
import TableChartIcon from "@mui/icons-material/TableChart";
import { EndpointState, EntityState } from "../../utility/redux/state";
import { Link, Redirect } from "react-router-dom";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { getGraphData } from "../../utility/graph/query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./graph-data-table.scss";

const GraphDataTable: React.FunctionComponent<GraphDataTableProps> = ({
  allAttributes,
}) => {
  let selectedEntity: string;
  let rows: any[] = [];
  selectedEntity = useSelector(
    (state: EntityState) => state.selectedEntity.entity
  );
  useEffect(() => {
    getBoardData();
  }, []);

  const [getBoardData, { error, loading, data }] = useLazyQuery(
    getGraphData(allAttributes, selectedEntity)
  );
  if (loading) {
    console.log("time out");
  }
  if (error) {
    console.log(error);
  }
  if (data) {
    let queryData: any[];
    queryData = data[`${selectedEntity}s`];
    if (queryData !== undefined) {
      rows = [...queryData];
      console.log(rows);
    }
  }
  return (
    <div className="table-conatiner">
      <Table aria-label="simple table">
        <TableHead className="table-head">
          <TableRow>
            {allAttributes.map((item) => (
              <TableCell className="table-heading-text">{`${item.name}${
                item.type === "LIST" ||
                item.type === "OBJECT" ||
                item.type === "NON_NULL"
                  ? "_id"
                  : ""
              }`}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length !== 0
            ? rows.map((row) => (
                <TableRow key={row.id} component="th" scope="row">
                  {allAttributes.map((item) => (
                    <TableCell>{`${
                      item.type === "LIST" ||
                      item.type === "OBJECT" ||
                      item.type === "NON_NULL"
                        ? row[`${item.name}`] !== undefined
                          ? row[`${item.name}`].id
                          : ""
                        : row[`${item.name}`] !== undefined
                        ? row[`${item.name}`]
                        : ""
                    }`}</TableCell>
                  ))}
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default GraphDataTable;
