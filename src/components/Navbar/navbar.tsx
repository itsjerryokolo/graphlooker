import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeState } from './../../utility/redux/state';
import './navbar.scss';
import { toggleTheme } from '../../redux/actions/theme-action';
import Constants from '../../utility/constant';

const Navbar: React.FunctionComponent<{}> = (props) => {
  const dispatch = useDispatch();
  const label = Constants.LABELS.commonLables;
  const theme = useSelector((state: ThemeState) => state.themeSelector.theme);
  console.log('THeme', theme);
  const handleToggleTheme = () => {
    const newTheme = theme === label.LIGHT ? label.DARK : label.LIGHT;
    dispatch(toggleTheme(newTheme));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="toolbar toolbar-padding">
          <div className="menu-items">
            {theme === label.LIGHT ? (
              <img
                src="https://dapplooker.s3.amazonaws.com/assets/img/Dapplooker_light_theme_logo.png"
                height="47px"
                alt="dapplooker-icon"
              ></img>
            ) : (
              <img
                src="https://d2yxqfr8upg55w.cloudfront.net/assets/img/Dapplooker.svg"
                height="43px"
                alt="dapplooker-icon"
              ></img>
            )}
            <div className="theme-icon" onClick={handleToggleTheme}>
              {theme === label.LIGHT ? <DarkModeIcon /> : <LightModeIcon />}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
