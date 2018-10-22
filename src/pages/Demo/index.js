/**
 * @component index.js
 * @description demo 页面
 * @time 2018/10/22
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react';
import DemoStore from '@/models/demo';

// components

const ContainerView = styled.div``;

const Text = styled.div`
  color: red;
`;

const Button = styled.button`
`;

@observer
class MobxDemo extends React.Component {
  render() {
    return (
      <ContainerView>
        <Helmet>
          <title>Demo</title>
        </Helmet>
        <Text>Counter: {DemoStore.counter}</Text>
        <Text>Total clicks: {DemoStore.total}</Text>
        <Button onClick={DemoStore.increase}>+</Button>
        <Button onClick={DemoStore.decrease}>-</Button>
      </ContainerView>
    );
  }
}

MobxDemo.defaultProps = {};

MobxDemo.propTypes = {};

export default MobxDemo;
