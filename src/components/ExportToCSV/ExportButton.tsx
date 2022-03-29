import { useLocation, withRouter } from 'react-router-dom';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Tooltip } from '@mui/material';
import Constants from '../../utility/constant';

const ExportButton: React.FunctionComponent<any> = () => {
  let location = useLocation();
  const label = Constants.LABELS.commonLables;

  function clickHandler() {
    window.open(`${location.pathname}${location.search}&v=download`);
  }

  return (
    <>
      <Tooltip title={label.DOWNLOAD}>
        <button onClick={clickHandler} className="btn-exportcsv">
          <FileDownloadIcon />
        </button>
      </Tooltip>
    </>
  );
};

export default withRouter(ExportButton);
