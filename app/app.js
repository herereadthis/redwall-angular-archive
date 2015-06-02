var React = require('react');

require("./styles/global.less");

require("copy?name=foovicon.ico!./favicon.ico");

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

