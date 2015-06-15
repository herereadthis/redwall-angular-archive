'use strict';

import React from 'react';
import axios from 'axios';

import AppActions from 'AppActions';


class HitCounterDigits extends React.Component {

    constructor() {
        super();
    }

    makeNumbers = () => {
        var numArray, addZeros, _i, _j;

        // create an array out of the page hits, each item is a number
        numArray = this.props.pageHits.toString().split('');
        for (_j = 0;_j < numArray.length;_j = _j + 1) {
            numArray[_j] = parseInt(numArray[_j], 10);
        }
        // add enough decimal-leading zeros to array so that array is the size
        // of this.props.figures
        addZeros = this.props.figures - numArray.length;
        for (_i = 0;_i < addZeros;_i = _i + 1) {
            numArray.unshift(0);
        }
        return numArray.map((value, key) => {
            return (
                <div key={key}>{value}</div>
            );
        });
    };

    hitCounterWidth = () => {
        var minWidth = 0.4 + 2.2 * this.props.figures;
        minWidth = parseFloat(minWidth.toPrecision(12));

        return {
            minWidth: `${minWidth}rem`
        }
    };

    render() {
        return (
            <div data-hit-counter
                 style={this.hitCounterWidth()}>{this.makeNumbers()}</div>

        )
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
                    <HitCounterDigits pageHits={response.data.page_hits}
                        figures={this.props.figures}/>,
                    React.findDOMNode(this.refs.HitCounter)
                );
            })
            .catch((response) => {
                window.console.log('try this instead');
                React.render(
                    <HitCounterDigits pageHits={3000}
                                      figures={this.props.figures}/>,
                    React.findDOMNode(this.refs.HitCounter)
                );
            })
    }

    componentWillMount() {
        this.fetchHitCount(this.props.path);
    }

    render() {
        return (
            <div ref="HitCounter"></div>
        );
    }
}

