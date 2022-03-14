import React from 'react';
import Navbar from '../Navbar/navbar';
import './Download.scss';

const Download = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="download-msg">
        <h1>Download in progress...</h1>
        <h4>Your download will start automatically in a few seconds.</h4>
      </div>
    </>
  );
};

export default Download;
