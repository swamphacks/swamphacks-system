import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Pages
import { Login } from './pages';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router>
        <Route path='/'>
          <Login />
        </Route>
      </Router>
    </React.Fragment>
  );
};

export default App;
