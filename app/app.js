var React = require('react');

import { Link, RouteHandler} from 'react-router';

import Homepage from 'views/Homepage/Homepage';
import Code from 'views/Code/Code';

import AppActions from './AppActions';

require("styles/global.less");
require("static?!./favicon.ico?output=favicon.ico");


export default class App extends React.Component {
    componentWillReceiveProps() {
        if (this.props.ninetiesImg.length !== 0) {
            imageInfo = this.props.ninetiesImg[0];
            window.console.log(imageInfo);
        }

    }

    render() {
        return (
            <div>
                <Homepage {...this.props} />
                <RouteHandler />
            </div>
        );
    }
}

