import "./index.html";

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(<App modal={document.getElementById('modal') }/>, document.getElementById('root'));
