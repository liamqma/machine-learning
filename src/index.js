import './index.styl';
import React from 'react';
import { render } from 'react-dom';
import { App } from './app';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

render(<App />, document.getElementById('root'));