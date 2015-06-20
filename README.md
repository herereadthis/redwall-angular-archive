Redwall-Angular
===============

This repo is for archive purposes only. It is the AngularJS version of herereadthis.com. But since everyone is leaving that sinking ship, the new site will be using something else.

## Documentation

(Incomplete) [extended documentation](https://github.com/herereadthis/redwall/blob/master/docs/readme.md) is located in `docs` directory.

### Build

You will need NPM

```bash
$ brew install node
```

```bash
# 1-step build:
$ npm run all
```

```bash
# Alternative: detailed install
# install packages
$ npm install
# install Jekyll
$ gem install jekyll
# get bower dependencies
$ npm run bower
# run grunt automated tasks
$ npm run grunt
# browser will load URL at localhost:9000
$ npm run server
```

