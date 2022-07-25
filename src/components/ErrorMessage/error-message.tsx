import * as React from 'react';
import { ErrorMassageProps } from '../../utility/interface/props';
import './error-message.scss';
import { customMessages } from '../../utility/utility';
import Constants from '../../utility/constant';
import { Button } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';


const errorLabels = Constants.LABELS.errorComponenet;
const mailAddress = Constants.CONTACT.EMAIL;
const URL=window.location.href;
const ErrorMessage: React.FunctionComponent<ErrorMassageProps> = ({
  errorMessage,
  endpoint,
  type,
}) => {
  let customMessage: string = customMessages(errorMessage, endpoint);

  function getBodyForMail() {
    return `${Constants.MAIL_FORMAT.MAIL_GREETING} %0D%0D ${Constants.MAIL_FORMAT.MAIL_BODY} %0D%0D ${encodeURIComponent(URL)} %0D%0D ${Constants.MAIL_FORMAT.MAIL_ENDING_MESSAGE}`;
 }
  function getSubjectForMail() {
    return `${Constants.MAIL_FORMAT.MAIL_SUBJECT}`;
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
          <Button variant="contained" endIcon={<MailIcon />}>
            <a
              id="email-sender"
              href={
                'mailto:' +
                mailAddress +
                '?subject=' +
                getSubjectForMail() +
                '&body=' +
                getBodyForMail()
              }
              target="_blank"
            >
              {Constants.LABELS.commonLables.BUTTON_TEXT_FOR_EMAIL}
            </a>
          </Button>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
