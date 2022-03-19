import React from 'react';
import { Modal } from '@mui/material';
import Constants from '../../utility/constant';

const DownloadModal: React.FunctionComponent<any> = ({ sortedDataState, clickRef }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = React.useState(true);

  const exportLabels = Constants.LABELS.exportLabels;
  console.log(exportLabels);

  return (
    <Modal open={open}>
      <div className="modal-wrapper">
        <div className="modal-container">
          <h2 className="download-heading">
            {clickRef === false ? exportLabels.DWNLD_STARTED : exportLabels.DWNLD_SOON}
          </h2>

          {clickRef === false ? (
            <figure className="download-state">
              <img
                src="/images/firework-outline.gif"
                alt="Downloading..."
                width={150}
                height={150}
              />
            </figure>
          ) : (
            <figure className="download-state">
              <img
                src="/images/document-outline.gif"
                alt="Downloading..."
                width={150}
                height={150}
              />
            </figure>
          )}

          {clickRef === false ? (
            <h3 className="records-msg">Your Download started</h3>
          ) : (
            <h3 className="records-msg">
              {exportLabels.HOLD_MSG}
              <b>
                {' '}
                {sortedDataState.length} {exportLabels.RECORDS_MSG}
              </b>
            </h3>
          )}

          <figure className="warning-container">
            <img src="/images/error-outline.gif" alt="Downloading..." width={60} height={60} />
            <figcaption className="msg">{exportLabels.CLOSE_TAB_MSG}</figcaption>
          </figure>
        </div>
      </div>
    </Modal>
  );
};

export default DownloadModal;
