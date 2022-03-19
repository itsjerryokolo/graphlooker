import { useLocation, withRouter } from 'react-router-dom';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const ExportButton: React.FunctionComponent<any> = () => {
  let location = useLocation();

  function clickHandler() {
    console.log('opening download page');

    window.open(`${location.pathname}${location.search}&v=download`);
  }

  return (
    <>
      <button onClick={clickHandler} className="btn-exportcsv">
        <FileDownloadIcon />
      </button>
    </>
  );
};

export default withRouter(ExportButton);
