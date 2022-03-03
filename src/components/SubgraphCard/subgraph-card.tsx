import * as React from "react";
import "./subgraph-card.scss";

const SubgraphCard: React.FunctionComponent<{}> = (props) => {
  return (
    <div className="card">
      <img
        className="subgraph-logo"
        src="https://cryptologos.cc/logos/uniswap-uni-logo.svg?v=021"
        alt="dapplooker-icon"
      ></img>
      <h4>Uniswap</h4>
    </div>
  );
};

export default SubgraphCard;
