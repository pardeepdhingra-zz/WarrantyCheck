import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Main from './containers/Main'
import Login from './containers/Login'
import Registration from './containers/Registration'
import Products from './containers/Products'
import './index.css'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute path="login" component={Login}/>
      <Route path="login" component={Login}/>
      <Route path="registration" component={Registration} />
      <Route path="products" component={Products}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
