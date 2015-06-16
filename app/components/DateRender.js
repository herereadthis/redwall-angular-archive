'use strict';

import React from 'react';

export default class DateRender extends React.Component {

    constructor() {
        super();
    }

    static testRegex = /(([a-z])+|([^a-z0-9]*))/gi;
    static keyRegex = /^\w+$/;

    static propTypes = {
        date: React.PropTypes.string.isRequired,
        format: React.PropTypes.string,
        rdf: React.PropTypes.string
    };

    static defaultProps = {
        date: '',
        format: 'MM/dd/yy',
        rdf: 'dc:modified'
    };

    leadDecimal = (num) => {
        var newNum = num.toString();
        if (newNum.length === 1) {
            newNum = '0' + newNum;
        }
        return newNum;
    };

    makeDateObj = (date) => {
        var yyyy, yy, M, MMM, MMMM, w, www, wwww, d,
            H, h, a, m, s, sss,
            tz, dateObj;

        // years
        yyyy = date.getFullYear();
        yy = yyyy.toString().substring(2, 4);

        // months
        M = date.getMonth();

        MMM = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
            'Oct', 'Nov', 'Dec'];
        MMMM = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'];

        // days of the week
        w = date.getDay();
        www = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        wwww = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
            'Friday', 'Saturday'];

        // date
        d = date.getDate();

        // hours
        H = date.getHours();
        h = H;
        a = 'AM';
        if (h >= 12) {
            h = h - 12;
            a = 'PM';
        }
        if (h === 0) {
            h = 12;
        }

        // minutes
        m = date.getMinutes();

        // seconds
        s = date.getSeconds();
        sss = date.getMilliseconds();

        // timezone
        tz = date.getTimezoneOffset();

        dateObj = {
            date: date,
            yyyy,
            yy,
            M: M + 1,
            MM: this.leadDecimal(M + 1),
            MMM: MMM[M],
            MMMM: MMMM[M],
            w: w + 1,
            ww: this.leadDecimal(w + 1),
            www: www[w],
            wwww: wwww[w],
            d,
            dd: this.leadDecimal(d),
            H,
            HH: this.leadDecimal(H),
            h,
            hh: this.leadDecimal(h),
            a,
            m,
            mm: this.leadDecimal(m),
            s,
            ss: this.leadDecimal(s),
            sss,
            ssss: this.leadDecimal(sss),
            tz
        };

        return dateObj;
    };

    getFormatArray = (format) => {
        let formatArray = format.match(DateRender.testRegex),
            cleanArray  = [],
            _i;

        for (_i = 0; _i < formatArray.length; _i = _i + 1) {
            if (formatArray[_i] !== '') {
                cleanArray.push(formatArray[_i]);
            }
        }
        return cleanArray;
    };
    // Array interesection http://stackoverflow.com/questions/16227197/
    interesect = (array1, array2) => {
        var commonValues = array1.filter((value) => {
            return array2.indexOf(value) > -1;
        });
        return commonValues;
    };

    getDateTime = (dateObj, dateFormat) => {
        let dateValues = [],
            _k;

        for (_k = 0; _k < dateFormat.length; _k = _k + 1) {
            if (DateRender.keyRegex.test(dateFormat[_k]) === true) {
                dateValues.push(dateFormat[_k]);
            }
        }
        var dateTypes = {
            years: {
                match: ['yyyy', 'yy']
            },
            months: {
                match: ['M', 'MM', 'MMM', 'MMMM']
            },
            days: {
                match: ['d', 'dd']
            }
        };

        var _l, _m, _n,
            existArray = [],
            dateStamp  = '';

        for (_m in dateTypes) {
            dateTypes[_m].exists = false;

        }
        for (_l in dateTypes) {
            if (this.interesect(dateTypes[_l].match, dateValues).length !== 0) {
                dateTypes[_l].exists = true;
            }
            existArray.push(dateTypes[_l].exists);
        }
        // timestamp can be yyyy-MM-dd, yyyy-MM, MM-dd, or yyyy,
        // but not yyyy-dd, mm, or dd
        if (dateTypes.years.exists === true) {
            dateStamp = `${dateObj.yyyy}`;

            if (dateTypes.months.exists === true) {
                dateStamp = `${dateStamp}-${dateObj.MM}`;
            }
            if (dateTypes.days.exists === true) {
                dateStamp = `${dateStamp}-${dateObj.dd}`;
            }
        }
        else if (dateTypes.months.exists === true &&
            dateTypes.days.exists === true) {
            dateStamp = `${dateObj.MM}-${dateObj.dd}`
        }
        return dateStamp;
    };

    getDateValues = (dateObj, dateFormat) => {
        let dateValues = [],
            _j;

        for (_j = 0; _j < dateFormat.length; _j = _j + 1) {
            if (DateRender.keyRegex.test(dateFormat[_j]) === true) {
                dateValues.push(dateObj[dateFormat[_j]]);
            }
            else {
                dateValues.push(dateFormat[_j]);
            }
        }
        return dateValues.join('');
    };


    render() {
        let checkIfDate = Date.parse(this.props.date);

        if (isNaN(checkIfDate) === false || this.props.date !== undefined) {
            let date = new Date(this.props.date);
            let dateObj = this.makeDateObj(date);
            let dateFormat = this.getFormatArray(this.props.format);

            let formattedDate = this.getDateValues(dateObj, dateFormat);
            let dateStamp = this.getDateTime(dateObj, dateFormat);
            return (
                <time dateTime={dateStamp}
                      property={this.props.rdf}>{formattedDate}</time>
            );

        }
        else {
            return null;
        }
    }
}
