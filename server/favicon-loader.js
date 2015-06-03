/*
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mark Marijnissen
 */

var loaderUtils = require("node_modules/loader-utils");


module.exports = function (content) {
    this.cacheable && this.cacheable();
    if (!this.emitFile) throw new Error("emitFile is required from module system");
    var foo = loaderUtils.parseQuery(this.query);
    if (foo.name === undefined) {
        var url = 'favicon.ico';
        this.emitFile(url, content);
        return "module.exports = __webpack_public_path__ + " + JSON.stringify(url);
    }
    else {
        return '';
    }
};
module.exports.raw = true;


/*
 module.exports = function(content) {
 //assert(content instanceof Buffer);
 url = 'asdfasd';
 this.emitFile(url, content);
 return content;
 };
 module.exports.raw = true;
 */
