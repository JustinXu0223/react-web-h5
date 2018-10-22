/**
 * @component index.js
 * @description 全局入口
 * @time 2018/10/22
 * @author JUSTIN XU
 */
import React from 'react';
import styled from 'styled-components';
import Loadable from 'react-loadable';
import { Route, Switch, Redirect } from 'react-router-dom';
import routers from '@/constants/routers';

// components
import Header from '@/components/Layout/Header';
import LoadingComponent from '@/components/Loading';

const AsyncHome = Loadable({
  loader: () => import('./Home'),
  loading: LoadingComponent,
});
const AsyncDemo = Loadable({
  loader: () => import('./Demo'),
  loading: LoadingComponent,
});

const ContainerView = styled.div`
  display: flex;
  flex: 1;
`;

const SectionView = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

class App extends React.Component {
  state = {};
  render() {
    return (
      <ContainerView>
        <Header />
        <SectionView>
          <Switch>
            <Route exact path={routers.app} render={() => <Redirect to={routers.home} />} />
            <Route exact path={routers.home} component={AsyncHome} />
            <Route exact path={routers.demo} component={AsyncDemo} />
            <Route path="*" render={() => <Redirect to={routers.not_found} />} />
          </Switch>
        </SectionView>
      </ContainerView>
    );
  }
}

App.propTypes = {};

export default App;
