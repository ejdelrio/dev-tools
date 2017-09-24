import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import createAppStore from './lib/createAppStore.js';
import App from './component/app';

let store = createAppStore();

const createApp = () => {
  return(
    <Provider store=store>
      <App />
    </Provider>
  )
}

ReactDom.render(createApp(), document.getElementById('root'));
