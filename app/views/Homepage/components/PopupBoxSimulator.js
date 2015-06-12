var React = require('react');

import ColorShiftTitle from './ColorShiftTitle';

export default class PopupBoxSimulator extends React.Component {
    render() {
        window.console.log(this.props);
        return (
            <div className="popup_box_simulator">
                <span className="retro_spriter">{this.props.data.boxName}</span>
                <ColorShiftTitle title={this.props.data.boxTitle}
                                 colorShift={this.props.data.colorShift} />
                {this.props.children}
                <a className="popup_button retro_spriter popup_close">Close</a>
                <a className="popup_button retro_spriter popup_resize">Resize</a>
                <a className="popup_button retro_spriter popup_minimize">Minimize</a>
            </div>
        );
    }
}

