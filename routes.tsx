import * as React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
// import overview from './containers/overview';
import importWorksheet from './containers/importDataSet';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={importWorksheet} />
      <Route path="/counter" component={CounterPage} />
      <Route path="/overview" component={HomePage} />
      <Route path="/importWorksheet" component={importWorksheet} />
    </Switch>
  </App>
);
