import React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import "./list-item.scss";
import { ListItemProps } from "./../../utility/interface/props";
import TableChartIcon from "@mui/icons-material/TableChart";
import { EndpointState, EntityState } from "../../utility/redux/state";
import { Link, Redirect } from "react-router-dom";

const ListItem: React.FunctionComponent<ListItemProps> = ({ entity }) => {
  let selectedEntity: string;
  selectedEntity = useSelector(
    (state: EntityState) => state.selectedEntity.entity
  );
  const endpoint = useSelector(
    (state: EndpointState) => state.graphEndpoint.endpoint
  );
  const handleEntityChange = (entity: string) => {};
  return (
    <React.Fragment>
      <Link
        style={{ textDecoration: "none" }}
        className="links"
        to={`/${encodeURIComponent(endpoint)}/${entity}`}
      >
        <ListItemButton
          className={
            selectedEntity === entity
              ? `list-item-selected selected-background`
              : `list-item margin-halfrem`
          }
          onClick={() => handleEntityChange(entity)}
        >
          <TableChartIcon className="entity-logo"></TableChartIcon>
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="entity-name"
          >
            <ListItemText className="list-item-text" primary={entity} />
          </div>
        </ListItemButton>
        <Divider sx={{ borderBottomWidth: 0.01 }} color="#00A1FF" />
      </Link>
    </React.Fragment>
  );
};

export default ListItem;
