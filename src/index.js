/**
 * @component index.js
 * @description 全局入口
 * @time 2018/10/22
 * @author JUSTIN XU
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, injectGlobal } from 'styled-components';
import { Provider } from 'mobx-react';
import RootStore from './models';
import history from './utils/history';
import Router from './router';
import theme from './styles';

// you can open local mock
// import mock from './mock';
//
// if (process.env.NODE_ENV !== 'production') {
//   mock.start();
// }

injectGlobal`
  html, body, #root {
    width: 100%;
    height: 100%;
    display: flex;
    font-family: ${theme.fontBasic};
  }
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    word-break: break-all;
  }
  ol, ul {
    list-style: none;
    list-style-type: none;
  }
  a:focus {
    text-decoration: none;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: 1.0em;
    font-weight: normal;
    font-style: normal;
  }
  a {
    border: none;
    text-decoration: none;
  }
  img {
    border: none;
    vertical-align: middle;
  }
`;

console.log(process.env);
ReactDOM.render(
  <Provider rootStore={RootStore}>
    <ThemeProvider theme={theme}>
      <Router history={history} />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
