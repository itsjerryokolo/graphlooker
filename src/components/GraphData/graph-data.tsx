import * as React from "react";
import "./graph-data.scss";
import { useLazyQuery, useQuery } from "@apollo/client";
import { getAllEntities } from "../../utility/graph/query";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useSelector, useDispatch } from "react-redux";
import { ThemeState } from "./../../utility/redux/state";
import { toggleTheme } from "../../redux/actions/theme-action";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ListItem from "../ListItem/list-item";
import queryString from "query-string";
import {
  setGraphEntity,
  setGraphEndpoint,
} from "../../redux/actions/endpoint-action";
import DataBoard from "../DataBoard/data-board";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<MuiAppBarProps>(({ theme }) => ({
  height: "60px",
  backgroundColor: "#03000C",
  boxShadow: "none",
}));
const drawerWidth = 300;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "2.2rem 1rem",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const GraphData: React.FunctionComponent<RouteComponentProps<any>> = ({
  match,
  location,
}) => {
  let dataLoading: boolean = true;
  const parsed = queryString.parse(location.search);
  React.useEffect(() => {
    if (parsed.uri && parsed.e) {
      const endpointEncoded = parsed.uri;
      const endpoint = decodeURIComponent(`${endpointEncoded}`);
      const entity = parsed.e;
      dispatch(setGraphEntity(`${entity}`));
      dispatch(setGraphEndpoint(endpoint));
      return;
    }
    window.location.href = "/";
  }, []);

  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const theme = useSelector((state: ThemeState) => state.themeSelector.theme);
  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(toggleTheme(newTheme));
  };
  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const { data, error, loading } = useQuery(getAllEntities);
  let allEntities: string[];
  allEntities = [];
  if (loading) {
    console.log("timeout");
    if (error) {
    }
  } else {
    if (error) {
      console.log("error", error);
    }
    if (data) {
      const queryData = data.__schema.queryType.fields;
      for (let index = 0; index < queryData.length; ++index) {
        const element = queryData[index];
        if (index % 2 === 0) {
          allEntities.push(element.name);
        }
      }
      allEntities.pop();
      if (allEntities.length > 0) {
        dataLoading = false;
      }
    }
  }
  const drawer = (
    <div>
      <Divider sx={{ borderBottomWidth: 0.01 }} color="#00A1FF" />
      <List
        className="drawer"
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          backgroundColor: `${theme === "light" ? "white" : "black"}`,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {allEntities.map((item, index) => (
          <ListItem key={index} entity={item}></ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      {dataLoading ? (
        <div className="loader">
          <span>Loading...</span>
        </div>
      ) : (
        <div className="card-container">
          <AppBar position="fixed" className="app-bar">
            <Toolbar className="toolbar toolbar-padding">
              <div className="menu-container">
                <Box
                  sx={{
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  <img
                    src="https://d2yxqfr8upg55w.cloudfront.net/assets/img/Dapplooker.svg"
                    height="43px"
                    alt="dapplooker-icon"
                  ></img>
                </Box>
                {drawerOpen ? (
                  <KeyboardDoubleArrowLeftIcon
                    className="toggle-drawer-icon"
                    onClick={handleToggleDrawer}
                  />
                ) : (
                  <KeyboardDoubleArrowRightIcon
                    className="toggle-drawer-icon"
                    onClick={handleToggleDrawer}
                  />
                )}
              </div>
              <div className="theme-icon" onClick={handleToggleTheme}>
                {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
              </div>
            </Toolbar>
          </AppBar>
          <Box>
            <Drawer
              variant="temporary"
              open={drawerOpen}
              onClose={handleToggleDrawer}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  backgroundColor: `${theme === "light" ? "white" : "black"}`,
                  color: "white",
                  paddingBottom: "8rem",
                },
              }}
            >
              <DrawerHeader>
                <Box>
                  <img
                    src="https://d2yxqfr8upg55w.cloudfront.net/assets/img/Dapplooker.svg"
                    height="33px"
                    alt="dapplooker-icon"
                  ></img>
                </Box>
              </DrawerHeader>
              {drawer}
            </Drawer>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  color: "white",
                  marginTop: "64px",
                  boxSizing: "border-box",
                  backgroundColor: `${theme === "light" ? "white" : "black"}`,
                  paddingBottom: "8rem",
                  display: { xs: "none", sm: "block" },
                },
              }}
              variant="persistent"
              anchor="left"
              open={drawerOpen}
            >
              {drawer}
            </Drawer>
          </Box>
          <DataBoard drawerOpen={drawerOpen}></DataBoard>
        </div>
      )}
    </>
  );
};

export default withRouter(GraphData);
