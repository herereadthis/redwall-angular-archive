import React from 'react';
//import App from './app';

import Router from 'react-router';

var {DefaultRoute, Route, Link} = Router;

// simple test to ensure babel is working
let foo = 'foo',
    bar = 'bar';

var obj = {foo, bar};

window.console.log('load main JS file with es6', obj);
// end simple test


class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <h1>Foo Foo</h1>
            </div>
        );
    }
}


class Inbox extends React.Component {
    render() {
        return (
            <div>
                <h1>Inbox</h1>
            </div>
        );
    }
}



class Homepage extends React.Component {
    render() {
        return (
            <div>
                <h1>Homepage</h1>
                <ul>
                    <li><Link to="app">Dashboard</Link></li>
                    <li><Link to="inbox">Inbox</Link></li>
                </ul>
            </div>
        );
    }
}


class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello world, it is nice to meet you!</h1>
                <ul>
                    <li><Link to="app">Dashboard</Link></li>
                    <li><Link to="inbox">Inbox</Link></li>
                </ul>
            </div>
        );
    }
}


let routes = (
    <Route name="app" path="/" handler={Homepage}>
        <Route name="inbox" path="/inbox" handler={Inbox}/>
        <DefaultRoute handler={App}/>
    </Route>
);


Router.run(routes, (Handler) => {
    React.render(
        <Handler/>,
        document.body
    );
});


/*
 React.render(
 <App />,
 document.body
 );

 */
