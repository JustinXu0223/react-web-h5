/**
 * @component Header.js
 * @description 头部组件
 * @time 2018/10/22
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import routers from 'constants/routers';

const ContainerView = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemView = styled(NavLink)`
  min-width: 80px;
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const HeaderList = [
  { name: 'Home', path: routers.home },
  { name: 'Demo', path: routers.demo },
  { name: '404', path: routers.not_found },
];

const Header = () => {
  const renderItem = () => {
    return HeaderList.map(_ => <ItemView key={_.name} to={_.path}>{_.name}</ItemView>);
  };
  return (
    <ContainerView>
      {renderItem()}
    </ContainerView>
  );
};

Header.defaultProps = {};

Header.propTypes = {};

export default Header;
