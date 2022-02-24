import * as React from "react";
import { ErrorMassageProps } from "../../utility/interface/props";
import SubgraphCard from "../SubgraphCard/subgraph-card";
import "./error-message.scss";

const ErrorMessage: React.FunctionComponent<ErrorMassageProps> = ({
  message,
}) => {
  return (
    <div className="error-message">
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
