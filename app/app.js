var React = require('react');

import { Link, RouteHandler} from 'react-router';

import Homepage from 'views/Homepage/Homepage';
import Code from 'views/Code/Code';

require("styles/global.less");
require("static?!./favicon.ico?output=favicon.ico");




export default class App extends React.Component {
    render() {
        return (
            <div>
                <Homepage />
                <RouteHandler />
            </div>
        );
    }
}

