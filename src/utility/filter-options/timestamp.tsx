import React from 'react';
import Constants from '../constant';

const timestamp = () => {
  const label = Constants.FILTERLABELS.columnNameLabels;
  return <div>{label.TIMESTAMP}</div>;
};

export default timestamp;
