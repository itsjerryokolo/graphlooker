import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import './loader.scss';
import Constants from '../../utility/constant';

const Loader = () => {
  const label = Constants.LABELS.commonLables;
  return (
    <>
      <div className="loader">
        <CircularProgress className="circular-loader" size={80} thickness={4} />
        <Typography variant="h5" component="h5" className="loader-text">
          {label.LOADING}
        </Typography>
      </div>
    </>
  );
};

export default Loader;
