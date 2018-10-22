/**
 * @component index.js
 * @description 错误页
 * @time 2018/10/22
 * @author JUSTIN XU
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

// static source
import NotFoundIcon from '@/assets/404.png';

// components
import NotDataComponent from '@/components/NotData';

const ContainerView = styled.div`
  display: flex;
  flex: 1;
`;

const NotFound = () => (
  <ContainerView>
    <Helmet>
      <title>Not Found</title>
    </Helmet>
    <NotDataComponent
      icon={NotFoundIcon}
      notDataText="你所访问页面不存在"
    />
  </ContainerView>
);

NotFound.propTypes = {
};

export default NotFound;

