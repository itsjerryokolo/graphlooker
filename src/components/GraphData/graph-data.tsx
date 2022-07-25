import * as React from 'react';
import { useEffect, useState } from 'react';
import './graph-data.scss';
import { useLazyQuery, useQuery } from '@apollo/client';
import { getAllEntities, getNetworkName } from '../../utility/graph/query';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { queryToGetDeploymentId } from '../../utility/graph/query';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/actions/theme-action';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ListItem from '../ListItem/list-item';
import queryString from 'query-string';
import {
  setGraphEntity,
  setGraphEndpoint,
  setSubgraphName,
} from '../../redux/actions/endpoint-action';
import DataBoard from '../DataBoard/data-board';
import Constants from '../../utility/constant';
import Loader from '../Loader/loader';
import { Tooltip } from '@mui/material';
import ErrorMessage from '../ErrorMessage/error-message';
import { LoadingState, ThemeState } from '../../utility/redux/state';
import Footer from '../Footer/Footer';
import { noCase } from 'change-case';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<MuiAppBarProps>(() => ({
  height: '60px',
  backgroundColor: '#03000C',
  boxShadow: 'none',
}));
const drawerWidth = 300;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '2.2rem 1rem',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const GraphData: React.FunctionComponent<RouteComponentProps<any>> = ({ location }) => {
  const label = Constants.LABELS.commonLables;
  const dispatch = useDispatch();
  const parsed = queryString.parse(location.search);
  let graphName: string | any = parsed.uri?.slice(parsed.uri?.lastIndexOf('/') + 1);
  let url: string | any = parsed.uri;
  let endPoint = new URL(url);
  if (parsed.uri) {
    // graphName = humanizeString(graphName)?.toUpperCase();
    graphName = noCase(graphName)?.toUpperCase();
  }

  if (endPoint.host === 'gateway.thegraph.com') {
    graphName = label.GRAPH_HEADING;
  }

  React.useEffect(() => {
    if (parsed.uri && parsed.e) {
      const endpointEncoded = parsed.uri;
      const endpoint = decodeURIComponent(`${endpointEncoded}`);
      const entity = parsed.e;
      dispatch(setGraphEntity(`${entity}`));
      dispatch(setGraphEndpoint(endpoint));
      return;
    }

    window.location.href = Constants.ROUTES.HOME_ROUTE;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [deploymentId, setDeploymentId] = useState('');
  const [subgraphNetworkName, setSubgraphNetworkName] = useState('');
  const { data: deploymentData } = useQuery(queryToGetDeploymentId);
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const loadingScreen = useSelector((state: LoadingState) => state.dataLoading.loading);
  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const { data, error, loading } = useQuery(getAllEntities);

  const changetheme = () => {
    dispatch(toggleTheme(theme));
  };

  useEffect(() => {
    if (deploymentId.length) {
      getNetworkNameforQuery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deploymentId]);

  const [getNetworkNameforQuery, { data: networkName }] = useLazyQuery(
    getNetworkName(deploymentId),
    {
      context: { clientName: 'subgraph-network' },
    }
  );

  let theme = useSelector((state: ThemeState) => state.themeSelector.theme);

  if (theme === label.LIGHT_THEME_LABEL || theme === label.DARK_THEME_LABEL) {
  } else {
    theme = label.DARK_THEME_LABEL;
  }

  // Fetching SubGraphNetwork Name & passing it into global state with redux.
  useEffect(() => {
    if (deploymentData) {
      setDeploymentId(deploymentData._meta.deployment);
    }
  }, [deploymentData]);

  useEffect(() => {
    if (networkName) {
      if (networkName.indexingStatuses.length) {
        setSubgraphNetworkName(networkName.indexingStatuses[0].chains[0].network.toUpperCase());
        const subgraphNetwork = networkName.indexingStatuses[0].chains[0].network.toUpperCase();
        dispatch(setSubgraphName(subgraphNetwork));
      }
    }
  }, [dispatch, networkName]);

  let allEntities: string[];
  allEntities = [];
  if (loading) {
    if (error) {
    }
  } else {
    if (error) {
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
    }
  }
  const drawer = (
    <div>
      <Divider sx={{ borderBottomWidth: 0.01 }} color="#00A1FF" />
      <List
        className="list-drawer"
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          backgroundColor: `${theme === label.LIGHT_THEME_LABEL ? label.WHITE : label.BLACK}`,
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
      {error ? (
        <div className="error-screen">
          <img className="error-found" src="/images/error-outline.gif" alt="" />
          <div>
            <ErrorMessage type="icon" errorMessage={error?.message} endpoint={parsed.uri} />
          </div>
        </div>
      ) : null}

      {loadingScreen ? <Loader theme={theme} /> : ''}

      <div className="card-container" theme-selector={theme}>
        <AppBar position="fixed" className="app-bar">
          <Toolbar className="toolbar toolbar-padding">
            <div className="menu-container">
              <Box
                sx={{
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                <a href={Constants.ROUTES.HOME_ROUTE}>
                  <img
                    src="/images/GraphLooker_white_text.png"
                    height="50px"
                    alt="GraphLooker-icon"
                  ></img>
                </a>
              </Box>

              {drawerOpen ? (
                <div className="beta-tag">
                  <img src="./images/beta.png" alt="beta version"></img>
                  <Tooltip title={label.COLLAPSE}>
                    <KeyboardDoubleArrowLeftIcon
                      className="toggle-drawer-icon"
                      onClick={handleToggleDrawer}
                    />
                  </Tooltip>
                </div>
              ) : (
                <div className="beta-tag">
                  <img src="./images/beta.png" alt="beta version"></img>
                  <Tooltip title={label.EXPAND}>
                    <KeyboardDoubleArrowRightIcon
                      className="toggle-drawer-icon"
                      onClick={handleToggleDrawer}
                    />
                  </Tooltip>
                </div>
              )}
            </div>
            {/* <div className="social-icons">
              <div className="icon">
                <a href="https://discord.com/invite/FWyNJtEyxa" target="_blank" rel="noreferrer">
                  <DiscordSVG height={30} width={35} />
                </a>
              </div>

              <div className="icon">
                <a href="https://t.me/dapplooker" target="_blank" rel="noreferrer">
                  <TelegramSVG height={30} width={35} />
                </a>
              </div>

              <div className="icon">
                <a href="https://twitter.com/dapplooker" target="_blank" rel="noreferrer">
                  <TwitterSVG height={30} width={35} />
                </a>
              </div>
            </div> */}
            <h2 className="graph-heading">
              {graphName}
              {subgraphNetworkName ? `(${subgraphNetworkName})` : ''}
            </h2>

            <Tooltip title={label.SWITCH_THEME}>
              <div className="theme-icon" onClick={changetheme}>
                {theme === label.LIGHT_THEME_LABEL ? <DarkModeIcon /> : <LightModeIcon />}
              </div>
            </Tooltip>
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
            className="drawer-first"
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                backgroundColor: `${theme === label.LIGHT_THEME_LABEL ? label.WHITE : label.BLACK}`,
                color: 'white',
                paddingBottom: '8rem',
              },
            }}
          >
            <DrawerHeader>
              <Box>
                <a href={Constants.ROUTES.HOME_ROUTE}>
                  <img
                    src="/images/GraphLooker_theme_color_text.png"
                    height="33px"
                    alt="GraphLooker-icon"
                  ></img>
                </a>
              </Box>
            </DrawerHeader>
            {drawer}
          </Drawer>
          <Drawer
            className="drawer-two"
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                color: 'white',
                marginTop: '64px',
                boxSizing: 'border-box',
                backgroundColor: `${theme === label.LIGHT_THEME_LABEL ? label.WHITE : label.BLACK}`,
                paddingBottom: '8rem',
                display: { xs: 'none', sm: 'block' },
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
      <div>
        <Footer />
      </div>
    </>
  );
};

export default withRouter(GraphData);
