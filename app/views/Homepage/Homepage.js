var React = require('react');

import { Link, RouteHandler} from 'react-router';

import Banner from './components/Banner';
import RetroArt from './components/RetroArt';

export default class Homepage extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div id="retro_homepage">
                <Banner {...this.props} />
                <RetroArt {...this.props} />

                <h1>Hello world, it is nice to meet you!</h1>
                <ul>
                    <li><Link to="code">Code</Link></li>
                </ul>
            </div>
        );
    }
}

