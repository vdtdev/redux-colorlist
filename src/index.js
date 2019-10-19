import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from "react-redux";
import store from "./redux/store";

import ColorApp from "./App";
import { addColor } from './redux/actions';

// ReactDOM.render(<App />, document.getElementById('root'));

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <ColorApp />
  </Provider>,
  rootElement
);
addColor('Red', {r: 255, g: 0, b: 0});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
