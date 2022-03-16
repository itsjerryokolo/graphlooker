import React from 'react';
import { BrowserRouter, Route, Switch, RouteComponentProps } from 'react-router-dom';
import Home from './components/Home/home';
import './App.css';
import { useSelector } from 'react-redux';
import { EndpointState, ThemeState } from './utility/redux/state';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import GraphData from './components/GraphData/graph-data';

function App() {
  const theme = useSelector((state: ThemeState) => state.themeSelector.theme);
  const endpoint = useSelector((state: EndpointState) => state.graphEndpoint.endpoint);
  console.log('endpoint', endpoint);
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: endpoint,
  });

  return (
    <>
      <ApolloProvider client={client}>
        <div theme-selector={theme} className="App">
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/"
                render={(props: RouteComponentProps<any>) => <Home></Home>}
              ></Route>
              <Route
                exact
                path="/explore"
                render={(props: RouteComponentProps<any>) => <GraphData></GraphData>}
              ></Route>
            </Switch>
          </BrowserRouter>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
