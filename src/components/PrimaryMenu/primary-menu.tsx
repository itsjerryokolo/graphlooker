import { Button, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import "./primary-menu.css"
import { PrimaryMenuProps } from '../../utility/interface/props'
import ArrowDownwardTwoToneIcon from '@mui/icons-material/ArrowDownwardTwoTone';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';
import FilterListIcon from '@mui/icons-material/FilterList';
import { EndpointState, EntityState } from '../../utility/redux/state';
import { useSelector } from 'react-redux';
import FilterMenu from '../FilterMenu/filter-menu';

const PrimaryMenu: React.FunctionComponent<
    PrimaryMenuProps> = ({ attributeName, attributeType, attributeDataType }) => {

        let selectedEntity: string;
        const endpoint = useSelector(
            (state: EndpointState) => state.graphEndpoint.endpoint
        );
        selectedEntity = useSelector(
            (state: EntityState) => state.selectedEntity.entity
        );

        //Sort Data (Ascending /Descending) when Attribute Clicked
        const attributeClicked = (s: string, c: string) => {
            const URI = encodeURIComponent(endpoint);
            const entity =
                selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
            console.log(
                `http://localhost:3000/explore?uri=${URI}&e=${entity}&s=${s}&c=${c}`
            );
            window.location.href = `http://localhost:3000/explore?uri=${URI}&e=${entity}&s=${s}&c=${c}`;
        };

        const [anchorFiterEl, setAnchorFiterEl] = useState<null | HTMLElement>(null);
        const open = Boolean(anchorFiterEl);
        const handleFilterOpen = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorFiterEl(event.currentTarget);
        }
        const handleCloseMenu = () => {
            setAnchorFiterEl(null);
        }

        return (
            <>
                {attributeType === "LIST" ||
                    attributeType === "OBJECT" ||
                    attributeType === "NON_NULL"
                    ? ""
                    :
                    <MenuItem>
                        <button className="sort_btn_color">
                            <ArrowUpwardTwoToneIcon
                                className="dropdown_arrow"
                                onClick={() => attributeClicked('asc', attributeName)}
                            />
                        </button>
                        <button className="sort_btn_color">
                            <ArrowDownwardTwoToneIcon
                                className="dropdown_arrow"
                                onClick={() => attributeClicked('desc', attributeName)}
                            />
                        </button>
                    </MenuItem>
                }
                <MenuItem>
                    <Button aria-controls='filter_menu'
                        variant="text"
                        onClick={handleFilterOpen}
                        className="filterClick_btn"
                    >
                        <FilterListIcon color="primary"
                            className="filter_button" />
                        <span className='datatype'>Filter by this column</span>
                    </Button>
                </MenuItem>

                <Menu id="filter_menu"
                    onClose={handleCloseMenu}
                    anchorEl={anchorFiterEl}
                    open={open}
                    sx={{ position: "absolute", top: "-120px", left: "-30px" }}>

                    <FilterMenu attributeName={attributeName} attributeDataType={attributeDataType} />

                </Menu>
            </>
        )
    }

export default PrimaryMenu