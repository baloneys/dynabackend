import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './style.css';
import Home from './views/home';
import VRCDynamicPlayerTags from './views/vrc-dynamic-player-tags';
import NotFound from './views/not-found';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/vrc-dynamic-player-tags" component={VRCDynamicPlayerTags} />
        <Route path="*" component={NotFound} />
        <Redirect to="*" />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
