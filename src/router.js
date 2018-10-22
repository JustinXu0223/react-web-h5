/**
 * @component router.js
 * @description 顶层路由配置
 * @time 2018/10/22
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import routers from '@/constants/routers';

import LoadingComponent from './components/Loading';

const AsyncApp = Loadable({
  loader: () => import('./pages'),
  loading: LoadingComponent,
});
const AsyncNotFound = Loadable({
  loader: () => import('./pages/NotFound'),
  loading: LoadingComponent,
});

const Routers = ({ history = {} }) => (
  <Router history={history}>
    <Switch>
      <Route exact path={routers.not_found} component={AsyncNotFound} />
      <Route path={routers.app} component={AsyncApp} />
    </Switch>
  </Router>
);

Routers.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
    location: PropTypes.shape({
      hash: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
      state: PropTypes.any,
    }),
  }).isRequired,
};

export default Routers;
