import React, { Component } from 'react';
import {MemoryRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import InitiativeApp from '../subApps/initiativeTrackerApp/src/containers/InitiativeApp';

class App extends Component {
  constructor() {
    super();
    this.state = {      
    }
  }

  render() {
    return (
      <Router>
        <div class="main-window">
          <nav class="app-control-panel">
            <Link to='/encounters'>
              Encounters
            </Link>
            <Link to='/initiative'>
              Initiative
            </Link>
          </nav>
          <article class="main-content">
            <Route path="/encounters" component={Encounters} />
            <Route path="/initiative" component={InitiativeApp} />
            <Route path="/" render={()=> <Redirect to="/encounters" />}/>
          </article>
        </div>
      </Router>
    );
  }
}

const Encounters = () => {
  return (
    <h1>Ecounters</h1>
  );
}

const Initiative = () => {
  return (
    <h1>Asher's bullshit</h1>
  );
}

export default App;