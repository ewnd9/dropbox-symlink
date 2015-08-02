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

  var userDir = require('user-home');
  var dropboxDir = path.join(userDir, 'Dropbox');

  var filePath = path.join(userDir, file);
  var dropboxPath = path.join(dropboxDir, file);

  it('should show dropbox file path', function() {
    var lib = initLib(initFs({}))(filePath);
    expect(lib.dropboxFile).to.equal(dropboxPath);
  });

  it('should copy from dropbox', function() {
    var struct = {};
    struct[dropboxDir] = {
      '.test': dropboxFile,
    };

    var mockedFs = initFs(struct);
    expect(mockedFs.existsSync(filePath)).to.equal(false);

    var lib = initLib(mockedFs)(filePath);
    lib.linkFromDropbox();

    // mocked fs don't read symlinks
    expect(mockedFs.existsSync(filePath)).to.equal(true);
  });

  it('should copy to dropbox', function() {
    var struct = {};
    struct[userDir] = {
      '.test': dropboxFile,
    };

    var mockedFs = initFs(struct);
    expect(mockedFs.existsSync(dropboxPath)).to.equal(false);

    var lib = initLib(mockedFs)(filePath);
    lib.linkToDropbox();

    // mocked fs don't read symlinks
    expect(mockedFs.existsSync(dropboxPath)).to.equal(true);
  });

});
