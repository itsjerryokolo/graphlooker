import React from 'react';
import { Button, Divider, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Constants from '../../utility/constant';
import { TimeFilterMenuProps } from '../../utility/interface/props';
import './time-filter-menu.scss';
import Timestamp from '../../utility/filter-options/timestamp';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { EndpointState, EntityState } from '../../utility/redux/state';

const TimeFilterMenu: React.FunctionComponent<TimeFilterMenuProps & RouteComponentProps<any>> = ({
  attributeName,
  location,
}) => {
  const parsed = queryString.parse(location.search);
  const theme = String(parsed.th);

  let selectedEntity: string;
  const endpoint = useSelector((state: EndpointState) => state.graphEndpoint.endpoint);
  selectedEntity = useSelector((state: EntityState) => state.selectedEntity.entity);

  const label = Constants.LABELS.commonLables;
  const filterOptionLabel = Constants.FILTERLABELS.filterOptionLabels;

  const timestampFilter = Constants.TIMESTAMP_MENU.timestampFilter;
  const timeFilter = Constants.TIMESTAMP_MENU.timeFilter;
  const currentFilter = Constants.TIMESTAMP_MENU.currentFilter;

  const [selectMenu, setSelectMenu] = React.useState('0');
  const [timeMenu, setTimeMenu] = React.useState('2');
  const [currentMenu, setCurrentMenu] = React.useState('0');
  const [inputValues, setInputValues] = React.useState(30);
  const [unitsOfTime, setUnitsOfTime] = React.useState('Days');
  const handleChange = (event: SelectChangeEvent) => {
    setSelectMenu(event.target.value as string);
  };
  const handleChangeTime = (event: SelectChangeEvent) => {
    setTimeMenu(event.target.value as string);
  };
  const handleChangeCurrent = (event: SelectChangeEvent) => {
    setCurrentMenu(event.target.value as string);
  };
  console.log(selectMenu);
  console.log(typeof selectMenu);

  const renderUpdateButton = () => {
    if (selectMenu === '0') {
      return Timestamp.perviousMenu(
        inputValues,
        unitsOfTime,
        endpoint,
        selectedEntity,
        theme,
        attributeName
      );
    } else if (selectMenu === '1') {
      return;
    }
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
            <MenuItem value={String(i)} key={i}>
              {item.menuItem}
            </MenuItem>
          ))}
        </Select>
        {selectMenu === '0' || selectMenu === '1' ? (
          <>
            <input
              type="number"
              className="time-inputfield"
              style={{ border: '1px solid black' }}
              value={inputValues}
              onChange={(e) => setInputValues(Number(e.target.value))}
            />
            <Select
              value={timeMenu}
              onChange={handleChangeTime}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              className="second-time-select"
            >
              {timeFilter.map((item, i) => (
                <MenuItem value={i} key={i} onClick={() => setUnitsOfTime(item.menuItem)}>
                  {item.menuItem}
                </MenuItem>
              ))}
            </Select>
          </>
        ) : selectMenu === '2' ? (
          <Select
            value={currentMenu}
            onChange={handleChangeCurrent}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            className="second-time-select"
          >
            {currentFilter.map((item, i) => (
              <MenuItem value={String(i)} key={i}>
                {item.menuItem}
              </MenuItem>
            ))}
          </Select>
        ) : null}
      </MenuItem>

      <Divider sx={{ my: 0.5 }} />
      <MenuItem>
        {selectMenu === '0' || selectMenu === '1' ? (
          <>
            <input type="checkbox" />
            <h3>{label.INCLUDE_TODAY}</h3>
          </>
        ) : null}

        <Button variant="contained" className="update-btn" onClick={() => renderUpdateButton()}>
          {label.UPDATE_BY_FILTER}
        </Button>
      </MenuItem>
    </>
  );
};

export default withRouter(TimeFilterMenu);
