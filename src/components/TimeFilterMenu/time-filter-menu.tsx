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
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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

  const timestampFilter = Constants.TIMESTAMP_MENU.timestampFilter;
  const timeFilter = Constants.TIMESTAMP_MENU.timeFilter;
  const currentFilter = Constants.TIMESTAMP_MENU.currentFilter;

  const [selectMenu, setSelectMenu] = React.useState('Previous');
  const [timeMenu, setTimeMenu] = React.useState('Days');
  const [currentMenu, setCurrentMenu] = React.useState('Day');
  const [inputValues, setInputValues] = React.useState(30);
  const [calendarDate, setCalendarDate] = React.useState(new Date());

  const handleChange = (event: SelectChangeEvent) => {
    setSelectMenu(event.target.value as string);
  };
  const handleChangeTime = (event: SelectChangeEvent) => {
    setTimeMenu(event.target.value as string);
  };
  const handleChangeCurrent = (event: SelectChangeEvent) => {
    setCurrentMenu(event.target.value as string);
  };

  const renderSelectMenu = (
    filteringArray: any[],
    menu: any,
    handleChange: ((event: SelectChangeEvent<any>, child: React.ReactNode) => void) | undefined
  ) => {
    return (
      <>
        <Select
          value={menu}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          className="second-select-menu"
        >
          {filteringArray.map((item, i) => (
            <MenuItem value={item.menuItem} key={i}>
              {item.menuItem}
            </MenuItem>
          ))}
        </Select>
      </>
    );
  };

  const renderUpdateButtonFunctions = () => {
    if (selectMenu === 'Previous') {
      return Timestamp.perviousFilter(
        inputValues,
        timeMenu,
        endpoint,
        selectedEntity,
        theme,
        attributeName
      );
    } else if (selectMenu === 'Current') {
      return Timestamp.currentFilter(currentMenu, endpoint, selectedEntity, theme, attributeName);
    } else if (selectMenu === 'Before') {
      return Timestamp.beforeFilter(calendarDate, endpoint, selectedEntity, theme, attributeName);
    } else if (selectMenu === 'After') {
      return Timestamp.afterFilter(calendarDate, endpoint, selectedEntity, theme, attributeName);
    } else if (selectMenu === 'On') {
      return Timestamp.OnFilter(calendarDate, endpoint, selectedEntity, theme, attributeName);
    } else if (selectMenu === 'Is Empty') {
      return Timestamp.isEmptyNotEmptyFilter(
        label.EMPTY,
        endpoint,
        selectedEntity,
        theme,
        attributeName
      );
    } else if (selectMenu === 'Not Empty') {
      return Timestamp.isEmptyNotEmptyFilter(
        label.NOT_EMPTY,
        endpoint,
        selectedEntity,
        theme,
        attributeName
      );
    }
  };

  return (
    <>
      <MenuItem
        className={
          selectMenu === 'Before' ||
          selectMenu === 'After' ||
          selectMenu === 'On' ||
          selectMenu === 'Is Empty' ||
          selectMenu === 'Not Empty'
            ? 'calendar-menu'
            : label.EMPTY
        }
      >
        <Select
          value={selectMenu}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          className="first-select-menu"
        >
          {timestampFilter.map((item, i) => (
            <MenuItem value={item.menuItem} key={i}>
              {item.menuItem}
            </MenuItem>
          ))}
        </Select>

        {selectMenu === 'Previous' ? (
          <>
            <input
              type="number"
              className="time-inputfield"
              value={inputValues}
              onChange={(e) => setInputValues(Number(e.target.value))}
            />
            {renderSelectMenu(timeFilter, timeMenu, handleChangeTime)}
          </>
        ) : null}

        {selectMenu === 'Current'
          ? renderSelectMenu(currentFilter, currentMenu, handleChangeCurrent)
          : null}
        {selectMenu === 'Before' || selectMenu === 'After' || selectMenu === 'On' ? (
          <>
            <div className="calendar">
              <Calendar onChange={setCalendarDate} value={calendarDate} />
            </div>
          </>
        ) : null}
      </MenuItem>

      <Divider sx={{ my: 0.5 }} />

      <MenuItem className="end-menu-item">
        <Button
          variant="contained"
          className={
            selectMenu === 'Next' || selectMenu === 'Between' ? 'update-filter-btn' : label.EMPTY
          }
          onClick={() => renderUpdateButtonFunctions()}
        >
          {label.UPDATE_FILTER}
        </Button>
      </MenuItem>
    </>
  );
};

export default withRouter(TimeFilterMenu);
