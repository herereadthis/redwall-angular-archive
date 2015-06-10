'use strict';

import { Store } from 'flummox';



const Watches = require('./assets/json/watches.json');


export default class AppStore extends Store {
    static ID = 'AppStore';

    static foo = () => {
        window.console.log(Watches);
    };

    constructor(flux) {
        super();

    }

}

