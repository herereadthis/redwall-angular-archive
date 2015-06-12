var React = require('react');


export default class ColorShiftTitle extends React.Component {

    static propTypes = {
        title: React.PropTypes.string.isRequired,
        colorShift: React.PropTypes.shape({
            begin: React.PropTypes.string,
            end: React.PropTypes.string
        })
    };

    static defaultProps = {
        colorShift: {
            begin: '000',
            end: 'FFF'
        }
    };

    componentWillMount() {
        this.setState({
            colorShift: {
                begin: this.hexToRgb(this.props.colorShift.begin),
                end: this.hexToRgb(this.props.colorShift.end)
            }
        })
    }

    // hexToRgb function taken from
    // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    hexToRgb = (hex) => {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex, newHex;
        shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        newHex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(newHex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;

        //return newHex;
    };

    letterColorize = () => {
        var colorShift = this.state.colorShift;
        var colorDiff = {
            r: colorShift.end.r - colorShift.begin.r,
            g: colorShift.end.g - colorShift.begin.g,
            b: colorShift.end.b - colorShift.begin.b
        };

        window.console.log(colorDiff);

        return this.props.title;
    };

    render() {
        window.console.log(this.state.colorShift.begin, this.state.colorShift.end);
        return (
            <h1>{this.letterColorize()}</h1>
        );
    }
}

