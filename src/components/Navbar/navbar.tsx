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
import FileCopyIcon from '@mui/icons-material/FileCopy';

const Navbar: React.FunctionComponent<{}> = (props) => {
  const theme = useSelector((state: ThemeState) => state.themeSelector.theme);
  const dispatch = useDispatch();
  const label = Constants.LABELS.commonLables;
  const changetheme = () => {
    dispatch(toggleTheme(theme));
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="toolbar toolbar-padding">
            <div className="menu-items">
              {theme === label.LIGHT_THEME_LABEL ? (
                <img
                  src="/images/GraphLooker_theme_color_text.png"
                  height="50px"
                  alt="GraphLooker-icon"
                ></img>
              ) : (
                <img
                  src="/images/GraphLooker_white_text.png"
                  height="50px"
                  alt="GraphLooker-icon"
                ></img>
              )}
              <div className="docs-container">
              <a href={Constants.URL.GRAPHLOOKER} target="_blank" rel="noreferrer">
                <button type="button" className="button">
                  <span className="button__text">{label.DOCS}</span>
                </button>
                </a>
              </div>
              <div className="theme-icon" onClick={changetheme}>
                {theme === label.LIGHT_THEME_LABEL ? <DarkModeIcon /> : <LightModeIcon />}
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
