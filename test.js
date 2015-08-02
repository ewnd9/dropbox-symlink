var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var proxyquire = require('proxyquire');
var FS = require('fs-mock');

describe('dropbox', function() {

  var initLib = function(mockedFs) {
    return proxyquire('./', {
      'fs': mockedFs,
      'symlink-or-copy': proxyquire('symlink-or-copy', {
        'fs': mockedFs
      })
    })
  };

  var initFs = function(struct) {
    // return mock.fs(struct);
    return new FS(struct);
  };

  var dropboxFile = {};

  var file = '.test';
  var filePath = '/home/ewnd9/.test';
  var dropboxPath = '/home/ewnd9/Dropbox/.test';

  it('should copy from dropbox', function() {
    var mockedFs = initFs({
      '/home/ewnd9/Dropbox': {
        '.test': dropboxFile,
      }
    });

    expect(mockedFs.existsSync(filePath)).to.equal(false);

    var lib = initLib(mockedFs)(filePath);
    lib.linkFromDropbox();

    // mocked fs don't read symlinks
    expect(mockedFs.existsSync(filePath)).to.equal(true);
  });

  it('should copy to dropbox', function() {
    var mockedFs = initFs({
      '/home/ewnd9': {
        '.test': dropboxFile,
      }
    });

    expect(mockedFs.existsSync(dropboxPath)).to.equal(false);

    var lib = initLib(mockedFs)(filePath);
    lib.linkToDropbox();

    // mocked fs don't read symlinks
    expect(mockedFs.existsSync(dropboxPath)).to.equal(true);
  });

});
