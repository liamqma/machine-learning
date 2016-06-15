import "./index.styl";
import React from "react";
import { render } from "react-dom";
import App from "./containers/app";
import { Provider } from 'react-redux';
import reducers from './reducers';
import { createStore } from 'redux';

const store = createStore(reducers, {}, window.devToolsExtension ? window.devToolsExtension() : f => f);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);