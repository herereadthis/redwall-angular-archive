var React = require('react');

export default class RetroArt extends React.Component {
    render() {
        var textAlign = {
            textAlign: 'center'
        };


        return (
            <article id="retro_art" className="starfield cinnamon_fantasy"
                     data-cinnamon-fantasy data-parallax-scroll
                     data-parallax-speed="-50">
                <h2>This website is all that and a bag of chips!</h2>
                <section className="bellmaker_container"
                         style={textAlign}>

                    <div className="centered_image">
                        <img src="http://herereadthis.com/build/images/homepage/netscape_88x31.gif" width="88" height="31" />
                    </div>


                    <br />
                    <h3 className="before_text_1">This page was created by Jimmy Ha. Last updated:
                        <time dateTime="2015-06-12" property="dc:modified">12 June 2014</time>
                    </h3>



                    <div id="hit_counter">
                        <div>
                            <p>~~Congratulations, you are the</p>
                        </div>
                        <div>
                            <div data-hit-counter data-hit-counter-figures="7"></div>
                        </div>
                        <div>
                            <p>visitor to this site!~~</p>
                        </div>
                    </div>
                </section>
            </article>
        );
    }
}

