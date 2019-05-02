/**
 * Framework file drivers
 */
exports = module.exports = {
  DropboxFileDriver: require('./dropbox-file-driver'),
  FtpFileDriver: require('./ftp-file-driver'),
  LocalFileDriver: require('./local-file-driver')
};