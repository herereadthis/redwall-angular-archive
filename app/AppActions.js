'use strict';

import { Actions } from 'flummox';

import axios from 'axios';


let serverFetchUsers = async ()=>{
    /*
    await axios.get('/timestamp.json')
        .then(function (response) {
            window.console.log(response.data);
            return response.data;
        })
        */

    let users = await axios.get('/timestamp.json')
        .then(function (response) {
            window.console.log(response.data);
            return response.data;
        })

};

export default class AppActions extends Actions {

    static ID = 'AppActions';


    async fetchUsers(status) {
        return status;
    }
}
