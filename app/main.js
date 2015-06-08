import React from 'react';
import App from './app';

import Code from './views/Code/Code';

import Router from 'react-router';


import FluxComponent from 'flummox/component';

import AppFlux from './AppFlux';
import AppStore from './AppStore';



var {DefaultRoute, Route, Link, RouteHandler} = Router;

// simple test to ensure babel is working
let foo = 'foo',
    bar = 'bar';

var obj = {foo, bar};

window.console.log('load main JS file with es6', obj);

// end simple test

const flux = new AppFlux();

var routes = (
    <Route>
        <Route name="code" path="code" handler={Code}/>
        <Route name="app" path="/" handler={App}/>
        <DefaultRoute handler={App}/>
    </Route>
);

Router.run(routes, (Handler) => {
    React.render(
        <FluxComponent flux={flux} connectToStores={[AppStore.ID]}>
            <Handler/>
        </FluxComponent>,
        document.body
    );
});
