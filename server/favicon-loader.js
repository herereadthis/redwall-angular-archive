/*
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mark Marijnissen
 */
var loaderUtils = require("loader-utils");
var path = require('path');
module.exports = function (content) {
    this.cacheable && this.cacheable();
    if (!this.emitFile) throw new Error("emitFile is required from module system");
    var url = this.resourcePath;
    var foo = loaderUtils.parseQuery(this.query);
    var query = !query || query.substr(1, 5) == "limit" ? false : query.substr(1);
    var root = query || this.options.copyContext || this.options.context;
    //url = url.substr(url.indexOf(root) + root.length) + ' ' + foo.name;
    if (foo.name === undefined) {
        url = 'favicon.ico';
        this.emitFile(url, content);
        return "module.exports = __webpack_public_path__ + " + JSON.stringify(url);
    }
    else {
        url = url.substr(url.indexOf(root) + root.length);
        return '';
    }
};
module.exports.raw = true;
