import React, { Component } from 'react';
import { BrowserRouter as Router, Route,   HashRouter } from 'react-router-dom';
import Home from "./home";
import Signup from "./signup";
import Dashboard from "./dashboard";
import Forgot from "./forgot";


class Routes extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Route path="/" component={Home} exact />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/forgot" component={Forgot} />
        </div>
      </HashRouter>
    );
  }
}

export default Routes;