/**
 * @component NotData.jsx
 * @description 没有数据组件
 * @time 2018/7/27
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { px2rem } from '@/utils/base';

// static source
import NotDataIcon from '@/assets/not-data.png';

// components
import ImgIcon from './ImgIcon';

const ContainerView = styled.div`
  flex: 1;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: ${px2rem(350)};
`;

const FooterText = styled.div`
  font-size: ${px2rem(12)};
  color: ${props => props.theme.primaryColor};
  margin-top: ${px2rem(14)};
`;

class NotData extends React.PureComponent {
  render() {
    const {
      icon,
      notDataText,
      hasData,
    } = this.props;
    if (hasData) {
      return null;
    }
    return (
      <ContainerView>
        <ImgIcon
          src={icon || NotDataIcon}
          size={85}
        />
        <FooterText>{notDataText}</FooterText>
      </ContainerView>
    );
  }
}

NotData.defaultProps = {
  notDataText: null,
  hasData: false,
  icon: null,
};

NotData.propTypes = {
  icon: PropTypes.string,
  hasData: PropTypes.bool,
  notDataText: PropTypes.string,
};

export default NotData;
