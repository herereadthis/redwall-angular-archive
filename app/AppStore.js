'use strict';

import { Store } from 'flummox';


const watches = require('./assets/json/watches.json');

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

