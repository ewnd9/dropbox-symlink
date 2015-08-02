var fs = require('fs');
var path = require('path');

module.exports = function(file, options) {
  options = options || {};

  options.onLinkTo = options.onLinkTo || function(fromFile, toFile) {
    console.log('[Dropbox] symlinked file ' + fromFile + ' to ' + toFile);
  };

  options.onLinkFrom = options.onLinkFrom || function(fromFile, toFile) {
    console.log('[Dropbox] symlinked file from ' + fromFile + ' to ' + toFile);
  };

  return new function() {
    var isWindows = process.platform === 'win32';
    var homePath = process.env[isWindows ? 'USERPROFILE' : 'HOME'];

    var filePath = path.resolve(file);

    // default paths documentation https://www.dropbox.com/help/321
    var dropboxPath = path.join(homePath, 'Dropbox');
    var dropboxFilePath = path.join(dropboxPath, path.basename(file));

    var hasDropbox = this.exists = fs.existsSync(dropboxPath);
    var hasDropboxFile = this.fileExists = hasDropbox && fs.existsSync(dropboxFilePath);

    var symlinkOrCopySync = require('symlink-or-copy').sync;

    this.linkToDropbox = function() {
      if (!fs.existsSync(dropboxFilePath)) { // @TODO check if exactly symlink
        symlinkOrCopySync(filePath, dropboxFilePath);
        options.onLinkTo(filePath, dropboxFilePath);
      }
    };

    this.linkFromDropbox = function() {
      if (!fs.existsSync(filePath)) { // @TODO check if exactly symlink
        symlinkOrCopySync(dropboxFilePath, filePath);
        options.onLinkFrom(dropboxFilePath, filePath);
      }
    }
  };
};
