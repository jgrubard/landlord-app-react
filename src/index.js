import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root');
const app = <App />;

ReactDOM.render(app, root);

serviceWorker.unregister();
