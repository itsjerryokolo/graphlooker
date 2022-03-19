import * as React from 'react';
import './graph-data.scss';
import { useQuery } from '@apollo/client';
import { getAllEntities } from '../../utility/graph/query';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeState } from './../../utility/redux/state';
import { toggleTheme } from '../../redux/actions/theme-action';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ListItem from '../ListItem/list-item';
import queryString from 'query-string';
import { setGraphEntity, setGraphEndpoint } from '../../redux/actions/endpoint-action';
import DataBoard from '../DataBoard/data-board';
import Constants from '../../utility/constant';
import ExportButton from '../ExportToCSV/ExportButton';
import Loader from '../Loader/loader';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<MuiAppBarProps>(({ theme }) => ({
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

const GraphData: React.FunctionComponent<RouteComponentProps<any>> = ({ match, location }) => {
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
    window.location.href = '/';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const label = Constants.LABELS.commonLables;
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const theme = useSelector((state: ThemeState) => state.themeSelector.theme);
  const handleToggleTheme = () => {
    const newTheme = theme === label.LIGHT ? label.DARK : label.LIGHT;
    dispatch(toggleTheme(newTheme));
  };
  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const { data, error, loading } = useQuery(getAllEntities);
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
      if (allEntities.length > 0) {
        dataLoading = false;
      }
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
          backgroundColor: `${theme === label.LIGHT ? label.WHITE : label.BLACK}`,
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
        <Loader />
      ) : (
        <div className="card-container">
          <AppBar position="fixed" className="app-bar">
            <Toolbar className="toolbar toolbar-padding">
              <div className="menu-container">
                <Box
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  <Link to="/">
                    <img
                      src="https://d2yxqfr8upg55w.cloudfront.net/assets/img/Dapplooker.svg"
                      height="43px"
                      alt="dapplooker-icon"
                    ></img>
                  </Link>
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

              <ExportButton />

              <div className="theme-icon" onClick={handleToggleTheme}>
                {theme === label.LIGHT ? <DarkModeIcon /> : <LightModeIcon />}
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
              className="drawer-first"
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                  backgroundColor: `${theme === label.LIGHT ? label.WHITE : label.BLACK}`,
                  color: 'white',
                  paddingBottom: '8rem',
                },
              }}
            >
              <DrawerHeader>
                <Box>
                  <Link to="/">
                    <img
                      src="https://d2yxqfr8upg55w.cloudfront.net/assets/img/Dapplooker.svg"
                      height="33px"
                      alt="dapplooker-icon"
                    ></img>
                  </Link>
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
                  backgroundColor: `${theme === label.LIGHT ? label.WHITE : label.BLACK}`,
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
      )}
    </>
  );
};

export default withRouter(GraphData);
