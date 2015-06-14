'use strict';

import { Store } from 'flummox';

import AppActions from './AppActions';

const watches = require('./assets/json/watches.json');

import axios from 'axios'

const timestamp = axios.get('/timestamp.json');
window.console.log(timestamp);

const popupBox = {
    boxName: 'Welcome to my site!',
    boxTitle: 'Here, Read This!',
    colorShift: {
        begin: 'F00',
        end: 'FF9600'
    }
};

export default class AppStore extends Store {
    static ID = 'AppStore';

    constructor(flux) {
        super();

        this.state = {
            watches,
            popupBox
        }
    }
}

