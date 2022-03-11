import React from 'react';
import { Button, Divider, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Constants from '../../utility/constant';
import { TimeFilterMenuProps } from '../../utility/interface/props';
import './time-filter-menu.scss';

const TimeFilterMenu: React.FunctionComponent<TimeFilterMenuProps> = ({ attributeName }) => {
  const label = Constants.LABELS.commonLables;
  const filterOptionLabel = Constants.FILTERLABELS.filterOptionLabels;

  const timestampFilter = Constants.TIMESTAMP_MENU.timestampFilter;
  const timeFilter = Constants.TIMESTAMP_MENU.timeFilter;
  const [selectMenu, setSelectMenu] = React.useState(filterOptionLabel.PREVIOUS);
  const [timeMenu, setTimeMenu] = React.useState(filterOptionLabel.DAYS);
  const handleChange = (event: SelectChangeEvent) => {
    setSelectMenu(event.target.value as string);
  };
  const handleChangeTime = (event: SelectChangeEvent) => {
    setTimeMenu(event.target.value as string);
  };
  return (
    <>
      <MenuItem>
        <Select
          value={selectMenu}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          className="first-time-select"
        >
          {timestampFilter.map((item, i) => (
            <MenuItem value={i} key={i}>
              {item.menuItem}
            </MenuItem>
          ))}
        </Select>
        <input type="number" className="time-inputfield" style={{ border: '1px solid black' }} />
        <Select
          value={timeMenu}
          onChange={handleChangeTime}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          className="second-time-select"
        >
          {timeFilter.map((item, i) => (
            <MenuItem value={i} key={i}>
              {item.menuItem}
            </MenuItem>
          ))}
        </Select>
      </MenuItem>

      <Divider sx={{ my: 0.5 }} />
      <MenuItem>
        <input type="checkbox" />
        <h3>Include today</h3>
        <Button variant="contained" className="update-btn">
          {label.UPDATE_BY_FILTER}
        </Button>
      </MenuItem>
    </>
  );
};

export default TimeFilterMenu;
