# dropbox-symlink

[![Build Status](https://travis-ci.org/ewnd9/dropbox-symlink.svg?branch=master)](https://travis-ci.org/ewnd9/dropbox-symlink)

> Experimenting with dropbox-as-a-backend

Symlink files to/from local dropbox folder (Supports only Mac And Linux)

## Install

```
$ npm install dropbox-symlink --save
```

## Usage

```javascript
var filePath = '/home/ewnd9/d2';

var dropbox = require('dropbox-symlink')(filePath, {
  onLinkFrom: function(fromFile, toFile) {
    // default: console.log('[Dropbox] symlinked file ' + fromFile + ' to ' + toFile)
  },
  onLinkTo: function(fromFile, toFile) {
    // default: console.log('[Dropbox] symlinked file from ' + fromFile + ' to ' + toFile)
  }
});

dropbox.exists; // is default dropbox folder finded in system
dropbox.fileExists; // is file already in dropbox folder
dropbox.dropboxFile; // absolute path to dropbox symlink

if (dropbox.exists) {
  if (!dropbox.fileExists && fs.existsSync(filePath)) {
    dropbox.linkToDropbox();
  } else if (dropbox.fileExists && !fs.existsSync(filePath)) {
    dropbox.linkFromDropbox();
  }
}
```

## TODO

- [ ] check directory linking support

## License

MIT © [ewnd9](http://ewnd9.com)
