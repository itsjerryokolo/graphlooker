import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import './loader.scss';
import Constants from '../../utility/constant';
import { LoaderProps } from '../../utility/interface/props';
import { customMessages } from '../../utility/utility';

const Loader: React.FunctionComponent<LoaderProps> = ({ theme, error, endpoint }) => {
  const label = Constants.LABELS.commonLables;
  let customMessage: string = error;

  if (error) {
    customMessage = customMessages(error, endpoint);
  }

  return (
    <>
      <div className="loader" theme-selector={theme}>
        <CircularProgress className="circular-loader" size={40} thickness={2} />
        <Typography variant="h5" component="h5" className="loader-text">
          {error ? customMessage : label.LOADING}
        </Typography>
      </div>
    </>
  );
};

export default Loader;
