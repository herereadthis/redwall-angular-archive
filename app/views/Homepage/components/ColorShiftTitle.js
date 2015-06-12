var React = require('react');


export default class ColorShiftTitle extends React.Component {

    static propTypes = {
        title: React.PropTypes.string.isRequired,
        colorShift: React.PropTypes.shape({
            start: React.PropTypes.string,
            end: React.PropTypes.string
        })
    };

    static defaultProps = {
        colorShift: {
            start: '000',
            end: 'FFF'
        }
    };

    hexToRgb = (hex) => {
        return hex;
    };

    componentWillMount() {
        this.setState({
            colorShift: {
                start: this.hexToRgb(this.props.colorShift.start),
                end: this.hexToRgb(this.props.colorShift.end)
            }
        })
    }

    render() {
        window.console.log(this.props);
        return (
            <h1>{this.props.title}</h1>
        );
    }
}

