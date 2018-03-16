import './assets/scss/compiler.scss';
import './assets/images/logo.svg';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AppComponent } from './components/app.component';

import LoggerStore from './stores/logger.store';

ReactDOM.render(
    <AppComponent compiler='TypeScript' framework='React' />,
    document.getElementById('root')
);