import React from 'react';
import './App.css';
import Login from './containers/Login.js'
import UserPage from './containers/UserPage.js';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="app-routes">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={UserPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
