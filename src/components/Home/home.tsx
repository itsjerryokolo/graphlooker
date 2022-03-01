import * as React from "react";
import ErrorMessage from "../ErrorMessage/error-message";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { getAllEntities } from "../../utility/graph/query";
import {
  setGraphEndpoint,
  setGraphEntity,
} from "../../redux/actions/endpoint-action";
import { RouteComponentProps, withRouter, Redirect } from "react-router-dom";
import "./home.scss";
import Navbar from "../Navbar/navbar";

const Home: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [endpoint, setEndpoint] = React.useState("");
  const [errorMessage, setError] = React.useState("");
  const { data, error, loading } = useQuery(getAllEntities);

  const dispatch = useDispatch();

  const searchEndpoint = (e: any) => {
    e.preventDefault();
    dispatch(setGraphEndpoint(endpoint));
  };

  if (loading) {
    console.log("timeout");
    if (error) {
    }
  } else {
    if (error) {
      console.log("error", error);
    }
    if (data) {
      const firstEntity = data.__schema.queryType.fields[0].name;
      const url = encodeURIComponent(endpoint);
      dispatch(setGraphEntity(firstEntity));
      return <Redirect push to={`explore?uri=${url}&e=${firstEntity}`} />;
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <h1>Subgraph Visualizer</h1>
        <div className="search-box">
          <form className="search-box-form" onSubmit={searchEndpoint}>
            <input
              className="search-input"
              id="endpoint"
              name="endpoint"
              type="text"
              placeholder="Enter Endpoint"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
            ></input>
            <button className="search-button" type="submit">
              Explore
            </button>
            {error && <ErrorMessage message={error.message}></ErrorMessage>}
          </form>
        </div>
        {/* <div className="subgraph-container">
        <div className="list-of-subgraph">
          <SubgraphCard theme={theme}></SubgraphCard>
          <SubgraphCard theme={theme}></SubgraphCard>
          <SubgraphCard theme={theme}></SubgraphCard>
          <SubgraphCard theme={theme}></SubgraphCard>
          <SubgraphCard theme={theme}></SubgraphCard>
          <SubgraphCard theme={theme}></SubgraphCard>
          <SubgraphCard theme={theme}></SubgraphCard>
          <SubgraphCard theme={theme}></SubgraphCard>
          <SubgraphCard theme={theme}></SubgraphCard>
        </div>
      </div> */}
      </div>
    </>
  );
};

export default withRouter(Home);
