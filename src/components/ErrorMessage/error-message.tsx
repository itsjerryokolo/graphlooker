import * as React from 'react';
import { ErrorMassageProps } from '../../utility/interface/props';
import './error-message.scss';
import { customMessages } from '../../utility/utility';

const ErrorMessage: React.FunctionComponent<ErrorMassageProps> = ({ message, endpoint }) => {
  let customMessage: string = customMessages(message, endpoint);

  return (
    <div className="error-message">
      <span>{customMessage}</span>
    </div>
  );
};

export default ErrorMessage;
