var React = require('react');

import { Link, RouteHandler} from 'react-router';



export default class Homepage extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello world, it is nice to meet you!</h1>
                <ul>
                    <li><Link to="code">Code</Link></li>
                </ul>
            </div>
        );
    }
}

