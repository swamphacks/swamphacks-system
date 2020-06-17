import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// Pages
import { SignIn, SignUp } from './pages';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router>
        <Route path='/'>
          <Redirect to='/signin' />
        </Route>
        <Route path='/signin'>
          <SignIn />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
      </Router>
    </React.Fragment>
  );
};

export default App;
