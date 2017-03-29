import React from 'react';
import ReactDOM from 'react-dom';
import InitiativeApp from './InitiativeApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InitiativeApp />, div);
});
