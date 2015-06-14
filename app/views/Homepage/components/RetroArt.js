var React = require('react');

import AppActions from 'AppActions';

export default class RetroArt extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.props.flux.getActions(AppActions.ID).fetchTimestamp(true);
    }


    componentDidMount() {
        if(!this.props.flux){
            return;
        }
        this.props.flux.getActions(AppActions.ID).fetchTimestamp(true);
    }


    makeTimestamp = () => {
        let ts = this.props.timestamp;

        let dateTimeRDF = `${ts.yyyy}-${ts.MM}-${ts.dd}`;
        let dateTime = `${ts.dd} ${ts.MMMM} ${ts.yyyy}`;
        return (
            <h3 className="before_text_1">
                <span>This page was created by Jimmy Ha. Last updated: </span>
                <time dateTime={dateTimeRDF}
                      property="dc:modified">{dateTime}</time>
            </h3>
        )
    };

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
                        <img src="http://herereadthis.com/build/images/homepage/netscape_88x31.gif" width={88} height={31} />
                    </div>


                    <br />

                    {this.makeTimestamp()}

                    <div id="hit_counter">
                        <div>
                            <p>~~Congratulations, you are the</p>
                        </div>
                        <div>
                            <div data-hit-counter
                                 data-hit-counter-figures={this.props.hitCounterFigures}
                                style={this.hitCounterWidth()}></div>
                        </div>
                        <div>
                            <p>visitor to this site!~~</p>
                        </div>
                    </div>
                    <div className="centered_image" style={addPadding(1)}>
                        <div data-sprite="broken_image"></div>
                    </div>
                    <div className="centered_image" style={addPadding(1)}>
                        <img src="http://herereadthis.com/build/images/homepage/under_construction_128x40.gif" width={128} height={31} />
                    </div>
                </section>
            </article>
        );
    }
}

