
const BaseView = require('carolina/main/views/base-view');

const File = require('carolina/main/files/file');
const HttpResponse = require('carolina/main/http/http-response');

class FileDownloadView extends BaseView {
  
  constructor() {
    super();
  }
  
  async make(drive, filepath, as="download") {
    
    let f = new File({ drive: drive, path: filepath });
    let fileExists = await f.exists();
    
    if (fileExists) {
      
      let fullPath = f.getFullPath();
      let response = new HttpResponse({});
      
      response.setDownload(fullPath, as, 200);
      return response;
    }
    else {
      throw `File does not exist.`;
    }
  }
}

exports = module.exports = FileDownloadView;