/**
 * @component Loading.js
 * @description 加载组件
 * @time 2018/10/22
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'antd-mobile';
import styled from 'styled-components';

const BasicView = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return (
      <BasicView>
        <ActivityIndicator size="large" />
      </BasicView>
    );
  }
  // Handle the error state
  if (error) {
    return <BasicView>Sorry, there was a problem loading the page...</BasicView>;
  }

  return null;
};

LoadingComponent.defaultProps = {
  error: null,
};

LoadingComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default LoadingComponent;
