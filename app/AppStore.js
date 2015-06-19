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
    static CACHE_90S_IMG = {
        CACHE: 86400000,
        KEY: 'cache90sImage',
        INDEX: 0
    };
    static NINETIES_IMG = {
        NAME: 'ninetiesImg'
    };

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
        let url = 'http://redwall.herereadthis.com/api/banner_image/';
        let updateCache = this.store90sImage();

        if (updateCache === true ||
            LocalStorageMethods.get(AppStore.NINETIES_IMG.NAME) === undefined) {

            axios.get(url)
                .then((response) => {
                    LocalStorageMethods.set(
                        AppStore.NINETIES_IMG.NAME,
                        JSON.stringify(response.data)
                    );
                    this.setState({
                        ninetiesImg: response.data
                    });
                }
            );
        }
        if (LocalStorageMethods.get(AppStore.NINETIES_IMG.NAME) !== undefined) {
            this.setState({
                ninetiesImg: JSON.parse(
                    LocalStorageMethods.get(AppStore.NINETIES_IMG.NAME))
            });
        }
    }

    store90sImage() {
        let cache90sImage, newCache, dateDiff, upDateCache;

        cache90sImage = LocalStorageMethods.get(AppStore.CACHE_90S_IMG.KEY);
        newCache = new Date();
        upDateCache = false;

        if (cache90sImage === undefined) {
            LocalStorageMethods.set(AppStore.CACHE_90S_IMG.KEY, newCache);
            cache90sImage = newCache;
            upDateCache = true;
        }
        dateDiff = Date.parse(newCache) - Date.parse(cache90sImage);

        if (dateDiff - AppStore.CACHE_90S_IMG.CACHE > 0) {
            upDateCache = true;
        }
        return upDateCache;
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

