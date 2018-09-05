import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './util/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
