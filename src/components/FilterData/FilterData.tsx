import React, { useState, useEffect } from 'react';
import { Chip } from '@mui/material';
import moment from 'moment';
import Constants from '../../utility/constant';
import Utility from '../../utility/utility';
import { UserProps } from '../../utility/interface/props';

// Map for Fetching the values when provided string as a key.
var arrOfTime = Constants.FILTERLABELS.timestampColumnNames;
var listOfFilters = new Map(Utility.filterData());
var listOfFiltersTime = new Map(Utility.filterDataOfTime());
var check: boolean = false;

const FilterData: React.FunctionComponent<UserProps> = ({ props }): JSX.Element => {
  const [time, settime] = useState('');
  var arr = arrOfTime.map((element) => element === props.c);
  arr.map((element) => (check = element || check));
  useEffect(() => {
    props.i !== undefined && props.i.length === 21
      ? settime(
          `${moment.unix(props.i.substring(0, 10)).format('LL')} ${moment
            .unix(props.i.substring(11, 21))
            .format('LL')}`
        )
      : settime(moment.unix(props.i).format('LL'));
  });

  return (
    <>
      {!props.f || props.s !== undefined ? null : (
        // The data which is fetched by the map is being displayed.Here,props is the object.
        // props.i = value entered by the user.
        // props.c=Int Or Alphamuneric Or timestamps specifications
        // props.s=Ascending Or Descending Order
        <Chip
          label={
            check
              ? `${listOfFiltersTime.get(props.f)}
               ${props.i !== undefined && props.i !== 'null' && props.i.length < 21 ? time : ''}
               ${
                 props.i !== undefined && props.i.length === 21
                   ? `${moment.unix(props.i.substring(0, 10)).format('LL')}` !==
                     `${moment.unix(props.i.substring(11, 21)).format('LL')}`
                     ? `${time}`
                     : `${moment.unix(props.i.substring(0, 10)).format('LL')}`
                   : ''
               }`
              : `${props.c} ${listOfFilters.get(props.f)} ${props.i} `
          }
          color="info"
          size="small"
        />
      )}

      {!props.s ? null : <Chip label={`${listOfFilters.get(props.s)}`} color="info" size="small" />}
    </>
  );
};

export default FilterData;
