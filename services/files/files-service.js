
/* global Carolina */

const BaseService = require('carolina/services/base-service');

class FilesService extends BaseService {
  
  constructor() {
    
    super("Files");
    
    this.fileDrivers = {};
    this.fileDriverClasses = {};
    
    let carolinaFileDrivers = require('carolina/main/files/file-drivers');
    this._initializeLibrary("fileDriverClasses", "fileDrivers",
      "files/file-drivers", carolinaFileDrivers, "file driver");
      
    this.drives = {};
      
    let fileDrives = Carolina.config("files.fileDrives", {});
    for (let fileDriveName in fileDrives) {
      let FileDriverClass = this._fileDriverClass(
        fileDrives[fileDriveName].driver);
      this.drives[fileDriveName] = new FileDriverClass();
      this.drives[fileDriveName].configure(fileDrives[fileDriveName],
        fileDriveName);
    }
  }
  
  _fileDriverClass(name) {
    return this._loadClass(name, "fileDriverClasses", "file driver");
  }
}

exports = module.exports = FilesService;