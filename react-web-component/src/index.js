import React from 'react';
import ReactWebComponent from 'react-web-component';

import './index.css';
import App from './App';

ReactWebComponent.create(<React.StrictMode><App /></React.StrictMode>, 'my-todos');
