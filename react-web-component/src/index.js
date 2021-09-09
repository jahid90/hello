import React from 'react';
import ReactWebComponent from 'react-web-component';

import App from './App';

import './index.css';

ReactWebComponent.create(<React.StrictMode><App /></React.StrictMode>, 'my-todos');
