import * as React from 'react';
import { ErrorMassageProps } from '../../utility/interface/props';
import './error-message.scss';
import { customMessages } from '../../utility/utility';
import Constants from '../../utility/constant';
import { Alert, Button } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const errorLabels = Constants.LABELS.errorComponenet;
const mailAddress = Constants.CONTACT.EMAIL;
const URL = window.location.href;
const ErrorMessage: React.FunctionComponent<ErrorMassageProps> = ({
  errorMessage,
  endpoint,
  type,
}) => {
  let customMessage: string = customMessages(errorMessage, endpoint);

  const copyURL=()=>{

    navigator.clipboard.writeText(window.location.href);
    
  }

  return (
    <>
      {type === 'message' ? (
        <div className="error-message">
          <span>{customMessage}</span>
        </div>
      ) : (
        <div className="error-conatiner">
          <img className="icon" src="/images/error_icon.gif" alt="" />
          <span className="message">{errorLabels.queryFailedMsg}</span>
          <div className="error-handling">
          <Button variant="contained" endIcon={<MailIcon />}>
            <a
              id="email-sender-link"
              href={
              'https://t.me/dapplooker'
              }
              target="_blank"
              rel="noreferrer"
            >
              {Constants.LABELS.commonLables.BUTTON_TEXT_FOR_EMAIL}
            </a>
          </Button>
          <Button onClick={copyURL} variant="contained" endIcon={<ContentCopyIcon/>}>
        Copy the URL
         </Button>
         </div>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
