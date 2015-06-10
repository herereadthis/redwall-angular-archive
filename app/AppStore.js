'use strict';

import { Store } from 'flummox';


const watches = require('./assets/json/watches.json');

export default class AppStore extends Store {
    static ID = 'AppStore';

    constructor(flux) {
        super();

        this.state = {
            watches
        }

    }

}

