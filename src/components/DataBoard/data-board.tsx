import React, { useEffect } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { DataBoardProps, ListItemProps } from "./../../utility/interface/props";
import TableChartIcon from "@mui/icons-material/TableChart";
import { EndpointState, EntityState } from "../../utility/redux/state";
import {
  Link,
  Redirect,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./data-board.scss";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { getAllAttributes } from "../../utility/graph/query";
import GraphDataTable from "../GraphDataTable/graph-data-table";

const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  marginTop: "64px",
  backgroundColor: "white",
  borderRadius: "10px",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: "width 2s",
  }),
  marginLeft: `-${drawerWidth}px`,

  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: "margin 2s",
    }),
    [theme.breakpoints.up("sm")]: {
      marginLeft: 0,
    },
  }),
}));
const DataBoard: React.FunctionComponent<
  DataBoardProps & RouteComponentProps
> = ({ drawerOpen }) => {
  const selectedEntity = useSelector(
    (state: EntityState) => state.selectedEntity.entity
  );
  const endpoint = useSelector(
    (state: EndpointState) => state.graphEndpoint.endpoint
  );
  let allAttributes: { name: string; type: string }[];
  allAttributes = [];
  const entity = selectedEntity
    ? selectedEntity.charAt(0).toUpperCase() + selectedEntity.slice(1)
    : "";

  useEffect(() => {
    getAttributes();
  }, []);
  const [getAttributes, { error, loading, data }] = useLazyQuery(
    getAllAttributes(entity)
  );
  if (loading) {
    console.log("timeout");
    if (error) {
    }
  } else {
    if (error) {
      console.log("error", error);
    }
    if (data) {
      const queryData = data.__type?.fields;
      if (queryData !== undefined) {
        for (let index = 0; index < queryData.length; ++index) {
          const element = queryData[index];
          if (
            !element.type?.ofType ||
            element.type?.ofType?.kind === "LIST" ||
            element.type?.ofType?.kind === "NON_NULL"
          )
            continue;
          allAttributes.push({
            name: element.name,
            type: element.type?.ofType?.kind,
          });
        }
      }
      console.log(queryData);
    }
  }

  return (
    <Main open={drawerOpen}>
      <div
        className="tab-pane"
        id="tab0"
        role="tabpanel"
        aria-labelledby="tab_0"
      >
        <GraphDataTable allAttributes={allAttributes}></GraphDataTable>
      </div>
    </Main>
  );
};

export default withRouter(DataBoard);
