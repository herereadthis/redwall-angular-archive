'use strict';

import { Store } from 'flummox';

import AppActions from './AppActions';

import {HomepageConfig, LocalStorageMethods, SessionStorageMethods} from './AppConstants';

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

const NoResults = [null, ''];


export default class AppStore extends Store {

    static ID = 'AppStore';
    static LAST_PATH_KEY = 'lastPath';
    static CACHE_90S_IMAGE = 'cache90sImage';

    constructor(flux) {
        super();

        this.state = {
            watches,
            popupBox,
            timestamp: {},
            ninetiesImg: [],
            hitCounterFigures: HomepageConfig.hitCounterFigures
        };

        const appActionsIds = flux.getActionIds(AppActions.ID);

        this.registerAsync(appActionsIds.fetchTimestamp, this.fetchTimestamp);
        this.registerAsync(appActionsIds.fetch90sImage, this.fetch90sImage);
        this.register(appActionsIds.store90sImage, this.store90sImage);
        this.registerAsync(appActionsIds.fetchHitCount, this.fetchHitCount);
        this.register(appActionsIds.getLastPath, this.getLastPath);
        this.register(appActionsIds.recordLastPath, this.recordLastPath);
    }

    fetchTimestamp() {
        axios.get('/timestamp.json')
            .then((response) => {
                this.setState({
                    timestamp: response.data
                })
            })
    }

    fetch90sImage() {
        let url = 'http://redwall.herereadthis.com/api/banner_image/?sort=hits';
        axios.get(url)
            .then((response) => {
                this.setState({
                    ninetiesImg: response.data
                })
            })
    }
    store90sImage() {
        let cache90sImage = LocalStorageMethods.get(AppStore.CACHE_90S_IMAGE);

        if (cache90sImage === undefined) {
            let newCache = new Date();
            LocalStorageMethods.set(AppStore.CACHE_90S_IMAGE, newCache);
            cache90sImage = newCache;
        }
        window.console.log(cache90sImage)
    }


    fetchHitCount(path) {
        window.console.log(path);
    }

    getLastPath() {
        let lastPath = SessionStorageMethods.get(AppStore.LAST_PATH_KEY);
        return lastPath;
    }

    recordLastPath(path) {
        if (NoResults.indexOf(path) === -1) {
            SessionStorageMethods.set(AppStore.LAST_PATH_KEY, path);
        }
    }
}

