import React from 'react';
import Modal from '@mui/material/Modal';
import Constants from '../../utility/constant';
import './modals.scss';

const DownloadModal = (props: any) => {
  const { sortedDataState, clickRef } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = React.useState(true);

  const exportLabels = Constants.LABELS.exportLabels;

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
                // src={Constants.LABELS.imagePaths.FIREWORKS}
                src="/images/firework-outline.gif"
                alt={Constants.LABELS.commonLables.DOWNLOADING}
                width={150}
                height={150}
              />
            </figure>
          ) : (
            <figure className="download-state">
              <img
                // src={Constants.LABELS.imagePaths.DOWNLOAD}
                src="/images/document-outline.gif"
                alt={Constants.LABELS.commonLables.DOWNLOADING}
                width={150}
                height={150}
              />
            </figure>
          )}

          {clickRef && (
            <h3 className="records-msg">
              {exportLabels.HOLD_MSG}
              <b>
                {' '}
                {sortedDataState.length} {exportLabels.RECORDS_MSG}
              </b>
            </h3>
          )}

          {!(clickRef === false) && (
            <figure className="warning-container">
              <img
                // src={Constants.LABELS.imagePaths.ERROR}
                src="/images/error-outline.gif"
                alt={Constants.LABELS.commonLables.DOWNLOADING}
                width={60}
                height={60}
              />
              <figcaption className="msg">{exportLabels.CLOSE_TAB_MSG}</figcaption>
            </figure>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DownloadModal;
