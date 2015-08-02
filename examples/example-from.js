var filePath = '/home/ewnd9/example-from';

var fs = require('fs');
fs.writeFileSync('/home/ewnd9/Dropbox/example-from', JSON.stringify({ test: true }), 'utf-8');

var dropbox = require('./../')(filePath, {
  onLinkFrom: function(fromFile, toFile) {
    // default: '[Dropbox] symlinked file ' + fromFile + ' to ' + toFile
    console.log(fromFile, toFile);
  },
  onLinkTo: function(fromFile, toFile) {
    // default: '[Dropbox] symlinked file from ' + fromFile + ' to ' + toFile
    console.log(fromFile, toFile);
  }
});

dropbox.exists; // is default dropbox folder finded in system
dropbox.fileExists; // is file already in dropbox folder

if (dropbox.exists) {
  if (!dropbox.fileExists && fs.existsSync(filePath)) {
    dropbox.linkToDropbox();
  } else if (dropbox.fileExists && !fs.existsSync(filePath)) {
    dropbox.linkFromDropbox();
  }
}
