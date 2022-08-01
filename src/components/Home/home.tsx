import React, { useEffect, useState } from 'react';
import ErrorMessage from '../ErrorMessage/error-message';
import { useLazyQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEntities } from '../../utility/graph/query';
import { setGraphEndpoint, setGraphEntity } from '../../redux/actions/endpoint-action';
import { RouteComponentProps, withRouter, Redirect } from 'react-router-dom';
import './home.scss';
import Navbar from '../Navbar/navbar';
import Constants from '../../utility/constant';
import { ThemeState } from '../../utility/redux/state';
import Footer from '../Footer/Footer';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Tooltip } from '@mui/material';

const Home: React.FunctionComponent<RouteComponentProps<any>> = ({ history }) => {
  const commonLables = Constants.LABELS.commonLables;
  const [endpoint, setEndpoint] = React.useState(commonLables.EMPTY);
  const [errorMsg, setErrorMsg] = useState('');
  const [isError, setIsError] = useState(true);
  const theme = useSelector((state: ThemeState) => state.themeSelector.theme);
  const dispatch = useDispatch();
  const urlRegex =
    /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,5})/g;
  let isendpointCorrect = urlRegex.test(endpoint);

  const searchEndpoint = (e: any) => {
    e.preventDefault();
    dispatch(setGraphEndpoint(endpoint));
  };
  const [getEndpoint, { error, loading, data }] = useLazyQuery(getAllEntities);

  useEffect(() => {
    if (error) {
      setErrorMsg(error?.message);
    }
  }, [error]);

  useEffect(() => {
    if (isendpointCorrect) {
      setIsError(false);
    } else {
      setIsError(true);
    }
  }, [endpoint, isendpointCorrect]);

  if (loading) {
  } else {
    if (error) {
    }
    if (data) {
      const firstEntity = data.__schema.queryType.fields[0].type.name;
      const entityForDataQuery = data.__schema.queryType.fields[1].name;
      const url = encodeURIComponent(endpoint);
      dispatch(setGraphEntity(firstEntity));
      return <Redirect push to={`explore?uri=${url}&e=${firstEntity}&efd=${entityForDataQuery}`} />;
    }
  }

  const onChangeHandler = (e: any) => {
    setEndpoint(e);
    setErrorMsg('');
  };

  return (
    <>
      <div theme-selector={theme}>
        <Navbar></Navbar>
        <div className="container">
          <div className="search-box">
            <form className="search-box-form" onSubmit={searchEndpoint}>
              <input
                className="search-input"
                id="endpoint"
                name="endpoint"
                type="text"
                placeholder="Input Subgraph API Endpoint"
                value={endpoint}
                onChange={(e) => onChangeHandler(e.target.value)}
              ></input>
              <button
                className="search-button"
                type="submit"
                disabled={isError}
                onClick={() => {
                  getEndpoint();
                }}
              >
                {commonLables.EXPLORE}
              </button>

              <p className="explore-msg">
                {Constants.LABELS.commonLables.DESC_TITLE}
                <span>
                  <Tooltip
                    placement="right"
                    title={
                      <h3 style={{ fontSize: '14px', color: '#fffff' }}>
                        {commonLables.DOCS_INFO_REF}
                      </h3>
                    }
                    arrow
                  >
                    <InfoOutlinedIcon />
                  </Tooltip>
                </span>
              </p>

              {isError && endpoint.length > 0 ? (
                <ErrorMessage
                  type="message"
                  errorMessage={Constants.ERROR_MESSAGES.INVALID}
                  endpoint={endpoint}
                ></ErrorMessage>
              ) : errorMsg ? (
                <ErrorMessage
                  type="message"
                  errorMessage={error?.message}
                  endpoint={endpoint}
                ></ErrorMessage>
              ) : (
                ''
              )}
            </form>
          </div>

          <div className="subgraph-link-container">
            {/* link logic */}
            {commonLables.recentSubgraphs.map((item, i) => (
              <div className="links-tab">
                <div className="subgraph-link">
                  <ul>
                    <a href={item.LINK}>
                      <li className="link-text"> {item.NAME}</li>
                    </a>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default withRouter(Home);
