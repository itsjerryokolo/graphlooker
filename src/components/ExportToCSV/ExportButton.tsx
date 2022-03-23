import { useLocation, withRouter } from 'react-router-dom';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Tooltip } from '@mui/material';

const ExportButton: React.FunctionComponent<any> = () => {
  let location = useLocation();

  function clickHandler() {
    console.log('opening download page');

    window.open(`${location.pathname}${location.search}&v=download`);
  }

  return (
    <>
      <Tooltip title="Download">
        <button onClick={clickHandler} className="btn-exportcsv">
          <FileDownloadIcon />
        </button>
      </Tooltip>
    </>
  );
};

export default withRouter(ExportButton);
