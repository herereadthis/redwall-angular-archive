'use strict';

import { Store } from 'flummox';

import AppActions from './AppActions';
import AppConstants from './AppConstants';

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

    static NINETIES_IMG = {
        NAME: 'ninetiesImg',
        CACHE: 86400000,
        KEY: 'cache90sImage',
        INDEX_NAME: 'ninetiesImgIndex',
        INDEX: 0,
        COUNT: 'ninetiesImgCount'
    };

    constructor(flux) {
        super();

        this.state = {
            watches,
            popupBox,
            timestamp: {},
            ninetiesImgSize: 0,
            hitCounterFigures: HomepageConfig.hitCounterFigures
        };
/*
        let ninetiesSize = LocalStorageMethods.get(AppStore.NINETIES_IMG.COUNT);
        if (ninetiesSize !== undefined) {
            this.setState({
                ninetiesImgSize: ninetiesSize
            });
        }
        else {
            this.setState({
                ninetiesImgSize: 0
            });

        }
        */

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
            LocalStorageMethods.get(AppStore.NINETIES_IMG.NAME) === undefined ||
            LocalStorageMethods.get(AppStore.NINETIES_IMG.COUNT) === undefined) {
            window.console.log('make API CALL');
            axios.get(url)
                .then((response) => {
                    let dataLength = response.data.length;
                    LocalStorageMethods.set(
                        AppStore.NINETIES_IMG.COUNT,
                        dataLength
                    );
                    LocalStorageMethods.set(
                        AppStore.NINETIES_IMG.NAME,
                        JSON.stringify(response.data)
                    );
                    LocalStorageMethods.set(
                        AppStore.NINETIES_IMG.KEY,
                        new Date()
                    );
                    this.setNew90sIndex(dataLength);
                }
            );
        }
        else {
            this.setNew90sIndex(LocalStorageMethods.get(AppStore.NINETIES_IMG.COUNT))
        }
    }
    setNew90sIndex = (size) => {
        this.setState({
            ninetiesImgSize: size
        });
        LocalStorageMethods.set(
            AppStore.NINETIES_IMG.INDEX_NAME,
            AppConstants.getRandomInteger(size)
        );
    };

    store90sImage() {
        let cache90sImage, newCache, dateDiff, updateCache;

        cache90sImage = LocalStorageMethods.get(AppStore.NINETIES_IMG.KEY);
        newCache = new Date();
        updateCache = false;

        if (cache90sImage === undefined) {
            cache90sImage = new Date();
            updateCache = true;
        }
        dateDiff = Date.parse(newCache) - Date.parse(cache90sImage);

        if (dateDiff - AppStore.NINETIES_IMG.CACHE > 0) {
            updateCache = true;
        }
        return updateCache;
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

