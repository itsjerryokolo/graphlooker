import React from "react";
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
import { Link, Redirect } from "react-router-dom";
import { styled } from "@mui/material/styles";

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
const DataBoard: React.FunctionComponent<DataBoardProps> = ({ drawerOpen }) => {
  const selectedEntity = useSelector(
    (state: EntityState) => state.selectedEntity.entity
  );
  const endpoint = useSelector(
    (state: EndpointState) => state.graphEndpoint.endpoint
  );
  return (
    <Main open={drawerOpen}>
      <div
        className="tab-pane"
        id="tab0"
        role="tabpanel"
        aria-labelledby="tab_0"
      >
        <h1>Hello</h1>
      </div>
    </Main>
  );
};

export default DataBoard;
