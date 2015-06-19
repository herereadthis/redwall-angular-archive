'use strict';

import React from 'react';

export default class AppConstants {

    static HomepageConfig = {
        imgUrl: 'http://herereadthis.com/build/images/',
        hitCounterFigures: 7
    };

    static LocalStorageMethods = {
        set: (key, value) => {
            localStorage[key] = value;
        },
        get: (item) => {
            let obj = localStorage[item];
            return AppConstants.StringMethods.parseString(obj);
        },
        remove: (key)=> {
            localStorage.removeItem(key);
        }
    };

    static SessionStorageMethods = {
        set: (key, value) => {
            sessionStorage[key] = value;
        },
        get: (item) => {
            let obj = sessionStorage[item];
            return AppConstants.StringMethods.parseString(obj);
        },
        remove: (key)=> {
            sessionStorage.removeItem(key);
        }
    };

    static StringMethods = {
        parseString: (str) => {
            let numRegex = /^(\d+\.?\d*|\d+,?\d*|\.\d+|,\d+)$/;

            if (str === 'false') {
                return false;
            }
            else if (str === 'true') {
                return true;
            }
            else if (numRegex.test(str) === true) {
                return parseFloat(str, 10);
            }
            else {
                return str;
            }
        }
    };

    static DataSprite = (sprite) => {
        return (
            <div data-sprite={sprite}/>
        )
    };

};
