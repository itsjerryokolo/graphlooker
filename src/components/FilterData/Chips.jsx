import React from 'react';
import { Chip } from '@mui/material';

const FilterData = (props) => {
  console.log(props.chipData);
  return (

props.chipData.f ==undefined ? <></> :
    
 <Chip label={`${props.chipData.c} 
    ${props.chipData.f != undefined ? props.chipData.f.replaceAll('_', ''):props.chipData.f} 
    ${props.chipData.i} `}
     color="primary" 
     variant="outlined"
     size="small"
     />
  )
}

export default FilterData;