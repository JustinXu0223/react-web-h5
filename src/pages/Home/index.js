/**
 * @component index.js
 * @description 首页
 * @time 2018/10/23
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const ContainerView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

class Home extends React.PureComponent {
  render() {
    return (
      <ContainerView>
        <Helmet>
          <title>Home</title>
        </Helmet>
        HomeHome
      </ContainerView>
    );
  }
}

Home.defaultProps = {};

Home.propTypes = {};

export default Home;
