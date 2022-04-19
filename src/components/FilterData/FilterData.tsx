import React, { FC } from 'react';
import { Chip } from '@mui/material';
import moment from 'moment';
import Constants from '../../utility/constant';

var listOfFilters = new Map(Constants.filterData());
var listOfFiltersTime = new Map(Constants.filterDataOfTime());
// Map for Fetching the values

interface UserProps {
  props: any;
}
type PropData = {
  f: string;
  c: string;
  i: number;
};

const FilterData: FC<UserProps> = ({ props }): JSX.Element => {
  return (
    <>
      {props.f == undefined ? (
        <></>
      ) : (
        // Chips to Display The Data which is being fetched by the map
        <Chip
          label={
            props.c == 'timestamp'
              ? `${listOfFiltersTime.get(props.f)} ${
                  props.i != undefined && props.i != 'null' && props.i.length < 21
                    ? moment.unix(props.i).format('LL')
                    : ''
                }
       ${
         props.i != undefined && props.i.length == 21
           ? `${moment.unix(props.i.substring(0, 10)).format('LL')} 
          ${moment.unix(props.i.substring(11, 21)).format('LL')}`
           : ''
       }`
              : `${props.c.toUpperCase()} 
    ${listOfFilters.get(props.f)}
    ${props.i} `
          }
          color="info"
          size="small"
        />
      )}
      {/* Checking The Condition Whether Order(Ascending Or Descending) is specified or not */}
      {props.s == undefined ? (
        <></>
      ) : (
        <Chip label={`${listOfFilters.get(props.s)}`} color="info" size="small" />
      )}
    </>
  );
};

export default FilterData;
