import * as React from 'react';
import { ErrorMassageProps } from '../../utility/interface/props';
import './error-message.scss';
import Constants from '../../utility/constant';

const ErrorMessage: React.FunctionComponent<ErrorMassageProps> = ({ message, endpoint }) => {
  let customMessage: string = message;

  if (endpoint.includes('https://api.thegraph.com/subgraphs/name/')) {
    if (message.includes('Subgraph') && message.includes('not found')) {
      customMessage = Constants.ERROR_MESSAGES.NOT_FOUND;
    }
    if (message.includes('Failed to fetch')) {
      customMessage = Constants.ERROR_MESSAGES.FAILED_TO_FETCH;
    }
    if (message.includes('indexing_error')) {
      customMessage = Constants.ERROR_MESSAGES.INDEXING_ERROR;
    }
    if (message.includes('Unexpected token')) {
      customMessage = Constants.ERROR_MESSAGES.UNEXPECTED;
    }
  } else {
    customMessage = Constants.ERROR_MESSAGES.INVALID;
  }

  return (
    <div className="error-message">
      <span>{customMessage}</span>
    </div>
  );
};

export default ErrorMessage;
