'use strict';

import React from 'react';

import AppActions from 'AppActions';
import AppStore from 'AppStore';
import HitCounter from './HitCounter';
import DateRender from 'components/DateRender';

export default class RetroArt extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.props.flux.getActions(AppActions.ID).fetchTimestamp(true);
        let appStore = this.props.flux.getStore(AppStore.ID);
        var lastPath = appStore.getLastPath();
        this.setState({
            hitCounterPath: lastPath
        })
    }

    componentDidMount() {
        if (!this.props.flux) {
            return;
        }
        this.props.flux.getActions(AppActions.ID).fetchTimestamp(true);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.timestamp !== this.props.timestamp;
    }

    hitCounterWidth = () => {
        var minWidth = 0.4 + 2.2 * this.props.hitCounterFigures;

        return {
            minWidth: `${minWidth}rem`
        }
    };

    render() {
        var addPadding = (pad) => {
            return {
                paddingTop: `${pad}rem`
            }
        };

        return (
            <article id="retro_art" className="starfield cinnamon_fantasy"
                     data-cinnamon-fantasy data-parallax-scroll
                     data-parallax-speed="-50">
                <h2>This website is all that and a bag of chips!</h2>
                <section className="bellmaker_container">

                    <div className="centered_image">
                        <img
                            src="http://herereadthis.com/build/images/homepage/netscape_88x31.gif"
                            width={88} height={31}/>
                    </div>


                    <br />

                    <h3 className="before_text_1">
                        <span>This page was created by Jimmy Ha. Last updated: </span>
                        <DateRender date={this.props.timestamp.date}
                                    format="d MMMM yyyy"
                                    rdf="dc:modified"/>
                    </h3>

                    <div id="hit_counter">
                        <div>
                            <p>~~Congratulations, you are the</p>
                        </div>
                        <HitCounter figures={this.props.hitCounterFigures}
                                    path={this.state.hitCounterPath}
                                    flux={this.props.flux}/>

                        <div>
                            <p>visitor to this site!~~</p>
                        </div>
                    </div>
                    <div className="centered_image" style={addPadding(1)}>
                        <div data-sprite="broken_image"></div>
                    </div>
                    <div id="email_joke">
                        <div>
                            <p>My Email:</p>
                        </div>
                        <div className="icon_box">
                            <div data-sprite="email"></div>
                        </div>
                        <div>
                            <p><a href="mailto:herereadthis@hotmail.com">herereadthis@hotmail.com</a>
                            </p>
                        </div>
                    </div>
                    <div className="centered_image" style={addPadding(1)}>
                        <img
                            src="http://herereadthis.com/build/images/homepage/under_construction_128x40.gif"
                            width={128} height={31}/>
                    </div>
                </section>
            </article>
        );
    }
}

