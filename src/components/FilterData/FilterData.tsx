import React from 'react';
import { Chip } from '@mui/material';
import moment from 'moment';
import Constants from '../../utility/constant';
import { UserProps } from '../../utility/interface/props';

// Map for Fetching the values when provided string as a key.
var listOfFilters = new Map(Constants.filterData());
var listOfFiltersTime = new Map(Constants.filterDataOfTime());


const FilterData:React.FunctionComponent<UserProps> = ({ props }): JSX.Element => {
  console.log(!props.s ==undefined)
  return (
    <>
      {!props.f ? (
        null
      ) : (
        // Chips to display The data which is being fetched by the map.Here props is the object.
        // props.i = value entered by the user.
        // props.c=Int Or Alphamuneric Or timestamps specifications
        // props.s=Ascending Or Descending Order
        <Chip
          label=
          { 
            props.c == 'timestamp'
            ? `${listOfFiltersTime.get(props.f)} ${props.i!=undefined  && props.i !== 'null' && props.i.length < 21 ? moment.unix(props.i).format('LL'): ''}
               ${ props.i  && props.i.length === 21 ? `${moment.unix(props.i.substring(0, 10)).format('LL')} 
               ${moment.unix(props.i.substring(11, 21)).format('LL')}`: ''}`
           : `${props.c.toUpperCase()} ${listOfFilters.get(props.f)} ${props.i} `
          }
          color="info"
          size="small"
        />
      )}
      {/* Checking The Condition Whether Order(Ascending Or Descending) is specified or not */}
      { !props.s ? (null) : (<Chip label={`${listOfFilters.get(props.s)}`} color="info" size="small" /> )}

    </>
  );
};

export default FilterData;
