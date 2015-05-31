import React from 'react';
import App from './app';

// simple test to ensure babel is working
let foo = 'foo',
    bar = 'bar';

var obj = {foo, bar};

window.console.log('load main JS file with es6', obj);
// end simple test

React.render(
    <App />,
    document.body
);
