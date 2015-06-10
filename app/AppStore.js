'use strict';

import { Store } from 'flummox';

var {foo} = require('json!./assets/json/watches.json');



export default class AppStore extends Store {
    static ID = 'AppStore';

    constructor(flux) {
        super();

    }

}

