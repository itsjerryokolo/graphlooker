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
import {
  Link,
  Redirect,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { getGraphData, getGraphDataForID } from "../../utility/graph/query";
import { useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import queryString from "query-string";
import "./graph-data-table.scss";

const GraphDataTable: React.FunctionComponent<
  GraphDataTableProps & RouteComponentProps<any>
> = ({ allAttributes, location }) => {
  let selectedEntity: string;
  let rows: any[] = [];
  const parsed = queryString.parse(location.search);
  const endpoint = useSelector(
    (state: EndpointState) => state.graphEndpoint.endpoint
  );
  selectedEntity = useSelector(
    (state: EntityState) => state.selectedEntity.entity
  );

  const getBoardDataAsQuery = () => {
    if (parsed.id !== undefined) {
      return getGraphDataForID(allAttributes, selectedEntity, `${parsed.id}`);
    }
    return getGraphData(allAttributes, selectedEntity);
  };
  useEffect(() => {
    getBoardData();
  }, []);

  const entityClicked = (entity: string, id: string, type: string) => {
    if (type === "OBJECT") {
      console.log(entity, id, type);
      const URI = encodeURIComponent(endpoint);
      console.log(`https://localhost:3000/${URI}/${entity}?id=${id}`);
      const selectedEntity = entity.charAt(0).toLowerCase() + entity.slice(1);
      window.location.href = `http://localhost:3000/${URI}/${selectedEntity}?id=${id}`;
    } else if (entity === "id") {
      window.open(
        `https://etherscan.io/address/${id}`,
        "_blank" // <- This is what makes it open in a new window.
      );
    }
  };

  const [getBoardData, { error, loading, data }] = useLazyQuery(
    getBoardDataAsQuery()
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
    <>
      {loading ? (
        <div className="loader">
          <span>Loading...</span>
        </div>
      ) : (
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
                        <TableCell
                          className={`${
                            item.type === "OBJECT" ? "entity-object" : ""
                          }${item.name === "id" ? "ether-scan-address" : ""}`}
                          onClick={() =>
                            entityClicked(
                              `${
                                item.type === "OBJECT"
                                  ? row[`${item.name}`] !== undefined
                                    ? row[`${item.name}`].__typename
                                    : ""
                                  : item.name
                              }`,
                              `${
                                item.type === "OBJECT"
                                  ? row[`${item.name}`] !== undefined
                                    ? row[`${item.name}`].id
                                    : ""
                                  : row[`${item.name}`] !== undefined
                                  ? row[`${item.name}`]
                                  : ""
                              }`,
                              item.type
                            )
                          }
                        >{`${
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
      )}
    </>
  );
};

export default withRouter(GraphDataTable);
