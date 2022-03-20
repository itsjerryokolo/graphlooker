import React, { useState } from 'react';
import { MenuItem, Select, Divider, TextField, Button, SelectChangeEvent } from '@mui/material';
import { useSelector } from 'react-redux';
import { filterNumberIs } from '../../utility/filter-options/number';
import { EndpointState, EntityState } from '../../utility/redux/state';
import { StringFilterMenuProps } from '../../utility/interface/props';
import Constants from '../../utility/constant';
import './number-filter-menu.scss';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import queryString from 'query-string';

const NumberFilterMenu: React.FunctionComponent<
  StringFilterMenuProps & RouteComponentProps<any>
> = ({ attributeName, location }) => {
  const parsed = queryString.parse(location.search);
  const theme = parsed.th;

  const label = Constants.LABELS.commonLables;
  const filterOptionLabel = Constants.FILTERLABELS.filterOptionLabels;

  let selectedEntity: string;
  const endpoint = useSelector((state: EndpointState) => state.graphEndpoint.endpoint);
  selectedEntity = useSelector((state: EntityState) => state.selectedEntity.entity);

  const intFilter = Constants.INT_TYPE_MENU.intFilter;
  const [selectMenu, setSelectMenu] = React.useState(filterOptionLabel.EQUAL_TO); //For Number
  const [optionSelected, setOptionSelected] = useState(label.EMPTY);
  const [numberValue, setNumberValue] = useState(label.EMPTY);
  const handleChange = (event: SelectChangeEvent) => {
    setSelectMenu(event.target.value as string);
  };

  return (
    <>
      <MenuItem>
        <Select
          value={selectMenu}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          className="number-select-options"
        >
          {intFilter.map((item, i) => (
            <MenuItem
              value={item.menuItem}
              key={i}
              onClick={() => setOptionSelected(item.menuValue)}
            >
              {item.menuItem}
            </MenuItem>
          ))}
        </Select>
      </MenuItem>
      <MenuItem>
        {selectMenu === filterOptionLabel.IS_EMPTY || selectMenu === filterOptionLabel.NOT_EMPTY ? (
          ''
        ) : (
          <>
            <Divider sx={{ my: 0.5 }} />
            <TextField
              label={label.SEARCH_BY_NUMBER}
              className="number-textfield"
              variant="outlined"
              value={numberValue}
              onChange={(e) => setNumberValue(e.target.value)}
            />
          </>
        )}
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem>
        <Button
          variant="contained"
          className="update-filter-btn"
          onClick={() =>
            filterNumberIs(
              endpoint,
              selectedEntity,
              attributeName,
              optionSelected,
              numberValue,
              theme
            )
          }
        >
          {label.UPDATE_BY_FILTER}
        </Button>
      </MenuItem>
    </>
  );
};

export default withRouter(NumberFilterMenu);
