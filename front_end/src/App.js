import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect
} from 'react-router-dom'
import './App.css';
import Header from './Components/Shared/Header'
import Music from './Components/Music/Music'
import Dashboard from './Components/User/Dashboard'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container-fluid" style={{ marginTop: '20px' }}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={(props) => <Music {...props} />} exact/>
            <Route path="/dashboard" component={(props) => <Dashboard {...props} />} exact/>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
