import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { GraphDataTableProps } from "./../../utility/interface/props";
import TableChartIcon from "@mui/icons-material/TableChart";
import {
  EndpointState,
  EntityState,
  AttributesState,
} from "../../utility/redux/state";
import {
  Link,
  Redirect,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import {
  getGraphData,
  getGraphDataForID,
  getSortedGraphData,
} from "../../utility/graph/query";
import { useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import queryString from "query-string";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import "./graph-data-table.scss";
import { ArrowDropDown, ArrowDropUp, KeyboardArrowDown } from "@mui/icons-material";
import { Button } from "@mui/material";
import ArrowDownwardTwoToneIcon from '@mui/icons-material/ArrowDownwardTwoTone';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';

const GraphDataTable: React.FunctionComponent<
  GraphDataTableProps & RouteComponentProps<any>
> = ({ drawerOpen, location }) => {
  let selectedEntity: string;
  let rows: any[] = [];
  let pageNumber: number = 1;
  let isNextDisable: boolean = false;
  let isPrevDisable: boolean = true;
  const parsed = queryString.parse(location.search);
  const endpoint = useSelector(
    (state: EndpointState) => state.graphEndpoint.endpoint
  );
  selectedEntity = useSelector(
    (state: EntityState) => state.selectedEntity.entity
  );
  const allAttributes = useSelector(
    (state: AttributesState) => state.allAttributes.attributes
  );

  const getBoardDataAsQuery = () => {
    if (parsed.id !== undefined) {
      return getGraphDataForID(allAttributes, selectedEntity, `${parsed.id}`);
    }
    if (parsed.s !== undefined && parsed.c !== undefined) {
      return getSortedGraphData(
        allAttributes,
        selectedEntity,
        `${parsed.s}`,
        `${parsed.c}`
      );
    }
    if (parsed.p !== undefined) {
      const PaginateNumber: string = `${parsed.p}`;
      pageNumber = parseInt(PaginateNumber);
      if (pageNumber > 1) {
        isPrevDisable = false;
      }
      const skip = 100 * (pageNumber - 1);
      return getGraphData(allAttributes, selectedEntity, 100, skip);
    }
    return getGraphData(allAttributes, selectedEntity, 100, 0);
  };
  useEffect(() => {
    getBoardData();
  }, []);

  const goToNext = () => {
    if (isNextDisable) return;
    const URI = encodeURIComponent(endpoint);
    window.location.href = `http://localhost:3000/explore?uri=${URI}&e=${selectedEntity}&p=${pageNumber + 1
      }`;
  };
  const goToPrev = () => {
    if (isPrevDisable) return;
    const URI = encodeURIComponent(endpoint);
    if (pageNumber == 2) {
      return (window.location.href = `http://localhost:3000/explore?uri=${URI}&e=${selectedEntity}`);
    }
    window.location.href = `http://localhost:3000/explore?uri=${URI}&e=${selectedEntity}&p=${pageNumber - 1
      }`;
  };

  const entityClicked = (entity: string, id: string, type: string) => {
    if (type === "OBJECT") {
      console.log(entity, id, type);
      const URI = encodeURIComponent(endpoint);
      console.log(
        `https://localhost:3000/explore?uri=${URI}&e=${entity}&id=${id}`
      );
      const selectedEntity = entity.charAt(0).toLowerCase() + entity.slice(1);
      window.location.href = `http://localhost:3000/explore?uri=${URI}&e=${selectedEntity}&id=${id}`;
    } else if (entity === "id") {
      window.open(
        `https://etherscan.io/address/${id}`,
        "_blank" // <- This is what makes it open in a new window.
      );
    }
  };

  //Sort Data (Ascending /Descending) when Attribute Clicked
  const attributeClicked = (s: string, c: string) => {
    const URI = encodeURIComponent(endpoint);
    const entity =
      selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
    console.log(
      `http://localhost:3000/explore?uri=${URI}&e=${entity}&s=${s}&c=${c}`
    );
    window.location.href = `http://localhost:3000/explore?uri=${URI}&e=${entity}&s=${s}&c=${c}`;
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
    queryData = data["entity"];
    if (queryData !== undefined) {
      rows = [...queryData];
      if (rows.length < 100) {
        isNextDisable = true;
      }
      console.log(rows);
    }
  }

  //Open/Close Filter DropDown Menu Functions
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [attribute, setAttribute] = useState('');
  const [attributeType, setAttributeType] = useState('');
  const [attributeTypeName, setAttributeTypeName] = useState('');
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const setAttributeDetails = (attributes: string, attributeType: string, attributeTypeName: string) => {
    setAttribute(attributes);
    setAttributeType(attributeType);
    setAttributeTypeName(attributeTypeName);
  }
  const handleCloseMenu = () => {
    setAnchorEl(null);
  }

  return (
    <>
      {loading ? (
        <div className="loader">
          <span>Loading...</span>
        </div>
      ) : (
        <div className="all-graph-data">
          <div
            className={`table-conatiner ${drawerOpen ? "drawer-open-table-length" : ""
              }`}
          >
            <Table
              stickyHeader
              aria-label="sticky table"
              className="data-table"
            >
              <TableHead>
                <TableRow>
                  {allAttributes.map((item) => (
                    <TableCell
                      sx={{
                        color: "white",
                        backgroundColor: "#03000c",
                        padding: "16px 8px",
                      }}
                    >
                      <Button
                        onClick={handleOpenMenu}
                        onMouseOver={() => setAttributeDetails(item.name, item.type, item.typeName)}
                        aria-controls='menu'
                        endIcon={<KeyboardArrowDown />}
                        variant="outlined"
                        sx={{ color: "white", fontWeight: "bold" }}
                      >
                        {`${item.name}${item.type === "LIST" ||
                          item.type === "OBJECT" ||
                          item.type === "NON_NULL"
                          ? "_id"
                          : ""
                          }`}
                      </Button>
                    </TableCell>
                  ))}
                  <Menu id="menu"
                    onClose={handleCloseMenu}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                  >
                    {attributeType === "LIST" ||
                      attributeType === "OBJECT" ||
                      attributeType === "NON_NULL"
                      ? ""
                      :
                      <MenuItem>
                        <button className="button_color">
                          <ArrowUpwardTwoToneIcon

                            onClick={() => attributeClicked('asc', attribute)}
                          />
                        </button>
                        <button style={{ marginLeft: "5px" }} className="button_color">
                          <ArrowDownwardTwoToneIcon
                            className="dropdown_arrow"
                            onClick={() => attributeClicked('desc', attribute)}
                          />
                        </button>
                      </MenuItem>
                    }
                    <MenuItem sx={{ fontWeight: "bold" }}>
                      DATATYPE:
                      <Button variant="text" size="large" sx={{ padding: "3px", fontWeight: "bold" }}>
                        {`${attributeTypeName}`}
                      </Button>
                    </MenuItem>

                  </Menu>

                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length !== 0
                  ? rows.map((row) => (
                    <TableRow key={row.id} component="th" scope="row">
                      {allAttributes.map((item) => (
                        <TableCell
                          sx={{ padding: "8px" }}
                          className={`${item.type === "OBJECT" ? "entity-object" : ""
                            }${item.name === "id" ? "ether-scan-address" : ""}`}
                          onClick={() =>
                            entityClicked(
                              `${item.type === "OBJECT"
                                ? row[`${item.name}`] !== undefined
                                  ? row[`${item.name}`].__typename
                                  : ""
                                : item.name
                              }`,
                              `${item.type === "OBJECT"
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
                        >{`${item.type === "LIST" ||
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
          {parsed.id === undefined ? (
            <div
              className={`next-previous-option ${drawerOpen ? "drawer-open-next-previous-option" : ""
                }`}
            >
              <Tooltip title="previous">
                <NavigateBeforeIcon
                  onClick={goToPrev}
                  className={`previous-icon ${isPrevDisable ? "disable-navigation" : ""
                    }`}
                ></NavigateBeforeIcon>
              </Tooltip>
              <span>{pageNumber}</span>
              <Tooltip title="next">
                <NavigateNextIcon
                  onClick={goToNext}
                  className={`${isNextDisable ? "disable-navigation" : ""}`}
                ></NavigateNextIcon>
              </Tooltip>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default withRouter(GraphDataTable);
