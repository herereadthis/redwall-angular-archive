'use strict';

export default class ParallaxScroll {

    static foobar = () => {
        window.console.log(document.body.scrollTop);
    };

    static getBgPosition = (bgStyle) => {
        var bgPosition, _i;
        bgPosition = bgStyle.split(' ');

        // you can state background position as one value that doubles for x/y.
        // if so, make both values equal.
        if (bgPosition.length === 1) {
            bgPosition[1] = bgPosition[0];
        }
        // it should grab top|center|etc as percentages, but we'll force it.
        for (_i = 0; _i < 2; _i++) {
            if (bgPosition[_i] === "center") {
                bgPosition[_i] = '50%';
            }
            else if (bgPosition[_i] === "top" || bgPosition[_i] === "left") {
                bgPosition[_i] = '0%';
            }
            else if (bgPosition[_i] === "bottom" || bgPosition[_i] === "right") {
                bgPosition[_i] = '100%';
            }
            if (/%/.test(bgPosition[_i]) === true) {
                if (parseInt(bgPosition[_i], 10) === 0) {
                    bgPosition[_i] = 0;
                }
            }
        }
        return bgPosition;

    };

    static moveBackground = (bgOffset, bgStyle, domHeight) => {
        window.addEventListener('scroll', function (event) {
            ParallaxScroll.foobar();
        }, true);
        var bgPosition = ParallaxScroll.getBgPosition(bgStyle);
        window.console.log(bgPosition, domHeight);
    };

    static killScrollListener = () => {
        window.removeEventListener('scroll', function () {
        }, true);
    }

};
