import "./index.styl";
import React from "react";
import { render } from "react-dom";
import App from "./containers/app";
import { Provider } from 'react-redux';
import reducers from './modules';
import { createStore } from 'redux';

const store = createStore(reducers, {}, window.devToolsExtension ? window.devToolsExtension() : f => f);

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./modules', () => {
        const nextRootReducer = require('./modules').default;
        store.replaceReducer(nextRootReducer);
    })
}

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);