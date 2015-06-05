var React = require('react');

require("./styles/global.less");





//require("copy?root=app/!./test.png");
require("static?!./favicon.ico?output=favicon.ico");


//require("copy?context=la!./favicon.ico");

//require('file?name=favicon.ico?[hash]&context=/');

//require("file?name=!./favicon.ico");
//require("file?name=favicon.ico!./favicon.ico");




export default class App extends React.Component {
    render() {
        return (
            <h1>Hello world, it is nice to meet you!</h1>
        );
    }
}

