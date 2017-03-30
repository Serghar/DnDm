import React, { Component } from 'react';
import InitiativeApp from '../subApps/initiativeTrackerApp/src/containers/InitiativeApp';

class App extends Component {

  constructor() {
    super();
    this.state = {      
    }
  }

  render() {
    console.log("App.js");
    return (
      <div>
        <InitiativeApp/>
      </div>
    );
  }
}

export default App;