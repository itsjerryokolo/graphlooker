import React, { useState } from 'react';
import logo from './logo.svg';
import {
  BrowserRouter,
  Route,
  Switch,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import Home from './components/Home/home';
import './App.css';
import Navbar from './components/Navbar/navbar';

function App() {
const [theme, setTheme] =useState('dark');

const toggleTheme = () => {
  (theme === 'light')?setTheme('dark'):setTheme('light');
}

  return (
    <div className="App">
          <BrowserRouter>
          <Navbar theme={theme} toggleTheme ={toggleTheme}></Navbar>
        <Switch>
          <Route
            exact
            path="/"
            render={(props: RouteComponentProps<any>) => (
              <Home
              theme={theme}
              ></Home>
            )}
          ></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
