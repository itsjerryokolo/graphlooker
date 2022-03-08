import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataBoardProps } from "./../../utility/interface/props";
import { EntityState } from "../../utility/redux/state";
import {
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import { styled } from "@mui/material/styles";
import "./data-board.scss";
import { useLazyQuery } from "@apollo/client";
import { getAllAttributes } from "../../utility/graph/query";
import GraphDataTable from "../GraphDataTable/graph-data-table";
import { setGraphAttributes } from "../../redux/actions/endpoint-action";

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
  const dispatch = useDispatch();
  let allAttributes: { name: string; type: string; typeName: string }[];
  allAttributes = [];
  const entity = selectedEntity
    ? selectedEntity.charAt(0).toUpperCase() + selectedEntity.slice(1)
    : "";

  useEffect(() => {
    getAttributes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            typeName: element.type?.ofType?.name,
          });
        }
      }
      console.log(queryData);
      if (allAttributes.length > 0) {
        dispatch(setGraphAttributes(allAttributes));
      }
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
        {allAttributes.length !== 0 ? (
          <GraphDataTable drawerOpen={drawerOpen}></GraphDataTable>
        ) : null}
      </div>
    </Main>
  );
};

export default withRouter(DataBoard);
