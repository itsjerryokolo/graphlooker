import { useLocation, withRouter } from 'react-router-dom';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Tooltip } from '@mui/material';

const ExportButton: React.FunctionComponent<any> = () => {
  let location = useLocation();

  function openNewTabForDownload() {
    window.open(`${location.pathname}${location.search}&v=download`);
  }

  return (
    <>
      <Tooltip title="Download">
        <button onClick={openNewTabForDownload} className="btn-exportcsv">
          <FileDownloadIcon />
        </button>
      </Tooltip>
    </>
  );
};

export default withRouter(ExportButton);
