import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import './primary-menu.scss';
import { PrimaryMenuProps } from '../../utility/interface/props';
import ArrowDownwardTwoToneIcon from '@mui/icons-material/ArrowDownwardTwoTone';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';
import FilterListIcon from '@mui/icons-material/FilterList';
import { EndpointState, EntityState } from '../../utility/redux/state';
import { useSelector } from 'react-redux';
import FilterMenu from '../FilterMenu/filter-menu';
import Constants from '../../utility/constant';

const PrimaryMenu: React.FunctionComponent<PrimaryMenuProps> = ({
  attributeName,
  attributeType,
  attributeDataType,
}) => {
  const label = Constants.LABELS.commonLables;
  const filterLabels = Constants.FILTERLABELS.dataTypeLabels;

  let selectedEntity: string;
  const endpoint = useSelector((state: EndpointState) => state.graphEndpoint.endpoint);
  selectedEntity = useSelector((state: EntityState) => state.selectedEntity.entity);

  //Sort Data (Ascending /Descending) when Attribute Clicked
  const attributeClicked = (s: string, c: string) => {
    const URI = encodeURIComponent(endpoint);
    const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
    console.log(`http://localhost:3000/explore?uri=${URI}&e=${entity}&s=${s}&c=${c}`);
    window.location.href = `http://localhost:3000/explore?uri=${URI}&e=${entity}&s=${s}&c=${c}`;
  };

  const [anchorFiterEl, setAnchorFiterEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorFiterEl);
  const handleFilterOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorFiterEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorFiterEl(null);
  };

  const getSortingMenu = () => {
    if (
      attributeType === filterLabels.LIST ||
      attributeType === filterLabels.OBJECT ||
      attributeType === filterLabels.NON_NULL
    ) {
    } else {
      return (
        <>
          <MenuItem>
            <button className="sort-btn">
              <ArrowUpwardTwoToneIcon
                className="dropdown-arrow"
                onClick={() => attributeClicked(label.ASC, attributeName)}
              />
            </button>
            <button className="sort-btn">
              <ArrowDownwardTwoToneIcon
                className="dropdown-arrow"
                onClick={() => attributeClicked(label.DESC, attributeName)}
              />
            </button>
          </MenuItem>
        </>
      );
    }
  };

  return (
    <>
      {getSortingMenu()}
      <MenuItem>
        <button
          aria-controls="filter_menu"
          onClick={handleFilterOpen}
          className="filter-menu-button"
        >
          <FilterListIcon color="primary" className="filter-list-icon" />
          <span className="filter-by-col-label">{label.FILTER_BY_THIS_COL}</span>
        </button>
      </MenuItem>

      <Menu
        id="filter_menu"
        onClose={handleCloseMenu}
        anchorEl={anchorFiterEl}
        open={open}
        className="filter-menu-div"
      >
        <FilterMenu attributeName={attributeName} attributeDataType={attributeDataType} />
      </Menu>
    </>
  );
};

export default PrimaryMenu;
