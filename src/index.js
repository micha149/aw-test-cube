import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createGlobalStyle } from 'styled-components'
import { store } from './effects/store'
import App from './app'
import 'bootstrap/dist/css/bootstrap.min.css'
import reportWebVitals from './reportWebVitals';

const GlobalStyle = createGlobalStyle`
.loading-page{ 
  background: black; 
  color: #fff; 
  font-size: 30px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  width: 100%;
}
body{
  background: black;
}
`
ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>, 
document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
