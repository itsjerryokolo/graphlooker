import { Button, Divider, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useState } from 'react'
import { FilterMenuProps } from '../../utility/interface/props'
import Constants from "../../utility/constant";
import { filterStringIs } from '../../utility/filter-options/string';
import { useSelector } from "react-redux";
import { EndpointState, EntityState } from '../../utility/redux/state';
import { filterNumberIs } from '../../utility/filter-options/number';

const FilterMenu: React.FunctionComponent<
    FilterMenuProps> = ({ attributeName, attributeDataType }) => {

        let selectedEntity: string;
        const endpoint = useSelector(
            (state: EndpointState) => state.graphEndpoint.endpoint
        );
        selectedEntity = useSelector(
            (state: EntityState) => state.selectedEntity.entity
        );

        const timestampFilter = Constants.TIMESTAMP_MENU.timestampFilter;
        const timeFilter = Constants.TIMESTAMP_MENU.timeFilter;
        const intFilter = Constants.INT_TYPE_MENU.intFilter;
        const stringFilter = Constants.STRING_TYPE_MENU.stringFilter;

        const [selectMenu, setSelectMenu] = React.useState('Equal to'); //For Number
        const [selectStringMenu, setSelectStringMenu] = React.useState('Is'); //For String
        const [timeMenu, setTimeMenu] = React.useState('2'); //For Timestamp

        const handleChange = (event: SelectChangeEvent) => {
            setSelectMenu(event.target.value as string);
        };
        const handleChangeString = (event: SelectChangeEvent) => {
            setSelectStringMenu(event.target.value as string);
        };
        const handleChangeTime = (event: SelectChangeEvent) => {
            setTimeMenu(event.target.value as string);
        };

        const [optionSelected, setOptionSelected] = useState('');
        const [stringValue, setStringValue] = useState('');
        const [numberValue, setNumberValue] = useState('');

        return (
            <>
                {attributeName === "createdAtTimestamp" ||
                    attributeName === "updatedAtTimestamp" ||
                    attributeName === "timestamp"
                    ?
                    <>
                        <MenuItem>
                            <Select
                                value={selectMenu}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{
                                    width: "120px", height: "40px",
                                    '&:focus': {
                                        borderRadius: 4,
                                        borderColor: '#80bdff',
                                        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
                                    },
                                }}
                            >
                                {timestampFilter.map((item, i) => (
                                    <MenuItem value={i}>
                                        {item.menuItem}
                                    </MenuItem>
                                ))}

                            </Select>
                            <input type="number" style={{ width: "40px", padding: "10px", margin: "0 10px 0 10px", border: "10%" }} />
                            <Select
                                value={timeMenu}
                                onChange={handleChangeTime}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{ width: "120px", height: "40px" }}
                            >
                                {timeFilter.map((item, i) => (
                                    <MenuItem value={i}>{item.menuItem}</MenuItem>
                                ))}
                            </Select>
                        </MenuItem>

                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem>
                            <input type="checkbox" />
                            <h6>Include today</h6>
                            <Button variant="contained"
                                sx={{ marginLeft: "60px" }}
                            >Update by Filter</Button>
                        </MenuItem>
                    </>
                    :
                    attributeDataType === "BigInt" ||
                        attributeDataType === "BigDecimal" ||
                        attributeDataType === "Int"
                        ?
                        <>
                            <MenuItem>
                                <Select
                                    value={selectMenu}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    sx={{ width: "360px", height: "40px" }}
                                >
                                    {intFilter.map((item, i) => (
                                        <MenuItem value={item.menuItem} key={i}
                                            onClick={() => setOptionSelected(item.menuValue)}>
                                            {item.menuItem}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </MenuItem>
                            <MenuItem>
                                {selectMenu === "Is Empty" ||
                                    selectMenu === "Not Empty"
                                    ?
                                    ""
                                    :
                                    <>
                                        <Divider sx={{ my: 0.5 }} />
                                        < TextField label="Enter Number"
                                            sx={{ width: "350px" }}
                                            variant="outlined"
                                            value={numberValue}
                                            onChange={(e) => setNumberValue(e.target.value)}
                                        />
                                    </>
                                }
                            </MenuItem>
                            <Divider sx={{ my: 0.5 }} />
                            <MenuItem>
                                <Button variant="contained"
                                    sx={{ marginLeft: "200px" }}
                                    onClick={() => filterNumberIs(endpoint, selectedEntity,
                                        attributeName, optionSelected, numberValue)}
                                >Update by Filter</Button>
                            </MenuItem>
                        </>
                        :
                        <>
                            <MenuItem>
                                <Select
                                    value={selectStringMenu}
                                    onChange={handleChangeString}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    sx={{ width: "360px", height: "40px" }}
                                >
                                    {stringFilter.map((item, i) => (
                                        <MenuItem value={item.menuItem} key={i}
                                            onClick={() => setOptionSelected(item.menuValue)}>
                                            {item.menuItem}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </MenuItem>
                            <MenuItem>
                                {selectStringMenu === "Is Empty" ||
                                    selectStringMenu === "Not Empty"
                                    ?
                                    ""
                                    :
                                    <>
                                        <Divider sx={{ my: 0.5 }} />
                                        < TextField label="Search by User"
                                            sx={{ width: "350px" }}
                                            variant="outlined"
                                            value={stringValue}
                                            onChange={(e) => setStringValue(e.target.value)}
                                        />
                                    </>
                                }
                            </MenuItem>
                            <Divider sx={{ my: 0.5 }} />
                            <MenuItem>
                                <Button variant="contained"
                                    sx={{ marginLeft: "200px" }}
                                    onClick={() => filterStringIs(endpoint, selectedEntity,
                                        attributeName, optionSelected, stringValue)}
                                >Update by Filter</Button>
                            </MenuItem>
                        </>
                }
            </>
        )
    }

export default FilterMenu

