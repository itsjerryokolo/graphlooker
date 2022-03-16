import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import './loader.scss';

const Loader = () => {
  return (
    <>
      <div className="loader">
        <CircularProgress className="circular-loader" size={80} thickness={4} />
        <Typography variant="h5" component="h5" className="loader-text">
          DOING SCIENCE
        </Typography>
      </div>
    </>
  );
};

export default Loader;
