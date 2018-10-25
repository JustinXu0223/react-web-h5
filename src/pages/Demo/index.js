/**
 * @component index.js
 * @description demo 页面
 * @time 2018/10/22
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { observer, inject } from 'mobx-react';

// components

const ContainerView = styled.div``;

const Text = styled.div`
  color: red;
`;

const Button = styled.button`
`;

@inject(({ rootStore }) => ({
  demoStore: rootStore.demoStore,
}))
@observer
class MobxDemo extends React.Component {
  render() {
    const {
      props: {
        demoStore,
      },
    } = this;
    return (
      <ContainerView>
        <Helmet>
          <title>Demo</title>
        </Helmet>
        <Text>Counter: {demoStore.counter}</Text>
        <Text>Total clicks: {demoStore.total}</Text>
        <Button onClick={demoStore.increase}>+</Button>
        <Button onClick={demoStore.decrease}>-</Button>
      </ContainerView>
    );
  }
}

MobxDemo.defaultProps = {
  demoStore: {},
};

MobxDemo.propTypes = {
  demoStore: PropTypes.objectOf(PropTypes.any),
};

export default MobxDemo;
