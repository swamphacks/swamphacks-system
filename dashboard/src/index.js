import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import Firebase, {FirebaseContext} from './components/Firebase';
import PageC, {PageContext} from './components/PageContext';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <PageContext.Provider value={new PageC()}>
      <Router>
        <App />
      </Router>
    </PageContext.Provider>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
