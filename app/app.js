var React = require('react');

import { Link, RouteHandler} from 'react-router';

import Homepage from 'views/Homepage/Homepage';
import Code from 'views/Code/Code';

import AppActions from './AppActions';

require("styles/global.less");
require("static?!./favicon.ico?output=favicon.ico");


export default class App extends React.Component {

    componentWillMount() {
        this.props.flux.getActions(AppActions.ID).fetchUsers(true);
    }


    componentDidMount() {
        if(!this.props.flux){
            return;
        }
        this.props.flux.getActions(AppActions.ID).fetchUsers(true);
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

