declare function require(path: string): any;
import './assets/scss/compiler.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AppComponent } from './components/app.component';
import LoggerStore from './stores/logger.store';

ReactDOM.render(
    <AppComponent compiler='TypeScript' framework='React' />,
    document.getElementById('root')
);