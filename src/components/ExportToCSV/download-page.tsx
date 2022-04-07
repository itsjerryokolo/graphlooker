import React from 'react';
import ErrorModal from '../Modals/ErrorModal';
import DownloadModal from '../Modals/DownloadModal';

const DownloadPage: React.FunctionComponent<any> = ({ sortedDataState, clickRef, error }) => {
  return (
    <>
      {error ? (
        <ErrorModal error={error} />
      ) : (
        <DownloadModal sortedDataState={sortedDataState} clickRef={clickRef} />
      )}
    </>
  );
};
{
}

export default DownloadPage;
