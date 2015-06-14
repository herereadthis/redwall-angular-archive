'use strict';

import React from 'react';
import axios from 'axios';

import AppActions from 'AppActions';


class HitCounterDigits extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>{this.props.pageHits}</div>
        );
    }
}

export default class HitCounter extends React.Component {

    constructor() {
        super();
    }

    fetchHitCount(path) {
        var canonicalURL = 'http://herereadthis.com',
            serviceURL = 'http://redwall.herereadthis.com/api/page_stats/?url=',
            encodedURL, fetchUrl;

        encodedURL = encodeURIComponent(canonicalURL + path);
        fetchUrl = serviceURL + encodedURL;

        axios.get(fetchUrl)
            .then((response) => {
                React.render(
                    <HitCounterDigits pageHits={response.data.page_hits} />,
                    React.findDOMNode(this.refs.HitCounter)
                );
            })
    }

    componentWillMount() {
        this.fetchHitCount(this.props.path);
    }

    hitCounterWidth = () => {
        var minWidth = 0.4 + 2.2 * this.props.figures;

        return {
            minWidth: `${minWidth}rem`
        }
    };

    render() {

        return (
            <div data-hit-counter
                 style={this.hitCounterWidth()}
                 ref="HitCounter"
                id="hitcounter"></div>
        );
    }
}

