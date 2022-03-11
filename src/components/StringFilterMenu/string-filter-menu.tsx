import React, { useState } from 'react';
import { Button, Divider, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { filterStringIs } from '../../utility/filter-options/string';
import Constants from '../../utility/constant';
import { useSelector } from 'react-redux';
import { EndpointState, EntityState } from '../../utility/redux/state';
import { StringFilterMenuProps } from '../../utility/interface/props';
import './string-filter-menu.scss';

const StringFilterMenu: React.FunctionComponent<StringFilterMenuProps> = ({ attributeName }) => {
  const label = Constants.LABELS.commonLables;
  const filterOptionLabel = Constants.FILTERLABELS.filterOptionLabels;

  let selectedEntity: string;
  const endpoint = useSelector((state: EndpointState) => state.graphEndpoint.endpoint);
  selectedEntity = useSelector((state: EntityState) => state.selectedEntity.entity);

  const stringFilter = Constants.STRING_TYPE_MENU.stringFilter;
  const [selectStringMenu, setSelectStringMenu] = React.useState(label.IS); //For String
  const [stringValue, setStringValue] = useState(label.EMPTY);
  const [optionSelected, setOptionSelected] = useState(label.EMPTY);
  const handleChangeString = (event: SelectChangeEvent) => {
    setSelectStringMenu(event.target.value as string);
  };
  return (
    <>
      <MenuItem>
        <Select
          value={selectStringMenu}
          onChange={handleChangeString}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          className="string-select-options"
        >
          {stringFilter.map((item, i) => (
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
        {selectStringMenu === filterOptionLabel.IS_EMPTY ||
        selectStringMenu === filterOptionLabel.NOT_EMPTY ? (
          label.EMPTY
        ) : (
          <>
            <Divider sx={{ my: 0.5 }} />
            <TextField
              label={label.SEARCH_BY_USER}
              className="string-textfield"
              variant="outlined"
              value={stringValue}
              onChange={(e) => setStringValue(e.target.value)}
            />
          </>
        )}
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem>
        <Button
          variant="contained"
          className="update-filter-button"
          onClick={() =>
            filterStringIs(endpoint, selectedEntity, attributeName, optionSelected, stringValue)
          }
        >
          {label.UPDATE_BY_FILTER}
        </Button>
      </MenuItem>
    </>
  );
};

export default StringFilterMenu;
