'use strict';

import { Store } from 'flummox';

import AppActions from './AppActions';

const watches = require('./assets/json/watches.json');

import axios from 'axios'

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
            popupBox,
            timestamp: {}
        };

        const appActionsIds = flux.getActionIds(AppActions.ID);

        this.registerAsync(appActionsIds.fetchUsers, this.fetchUsers);
    }

    fetchUsers() {
        let _this = this;
        axios.get('/timestamp.json')
            .then(function (response) {
                _this.setState({
                    timestamp: response.data
                })
            })
    }
}

