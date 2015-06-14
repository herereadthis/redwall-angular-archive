'use strict';

export default class AppConstants {

    static HomepageConfig = {
        imgUrl: 'http://herereadthis.com/build/images/',
        hitCounterFigures: 7
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
    }

};
