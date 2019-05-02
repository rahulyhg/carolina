
const formidable = require('formidable');

const File = require('carolina/main/files/file');

/**
 * class HttpRequest
 * Represents an HttpRequest.
 */
class HttpRequest {
  
  constructor(data) {
    
    this.body = data.body || new Buffer("");
    this.headers = data.headers || {};
    this.ipAddress = data.ipAddress || null;
    this.method = data.method || "GET";
    this.params = data.params || {};
    this.query = data.query || {};
    this.url = data.url || "";
    this.data = data.data || {};
    
    this._req = data.req || null;
    
    this.shouldContinue = true;
    this.middlewareCompleted = [];
    
    this.method = this.method.toUpperCase();
    
    this.cookies = {}; // middleware should load this from cookie header
    this.files = {};
    this.session = {};
    this.sessionId = null;
    
    this.info = {};
    this.user = null;
  }
  
  async getFiles() {
    
    let form = new formidable.IncomingForm();
    
    return new Promise((resolve, reject) => {
      
      let fobj = {};
      
      console.log(form);
      
      form.parse(this._req, function(err, fields, files) {
        
        console.log(err);
        
        if (err) reject(err);
        
        console.log(files);
        
        for (let i in files) {
          let fData = {
            isLocal: true,
            name: files[i].name,
            path: files[i].path,
            size: files[i].size,
            type: files[i].type
          };
          fobj[i] = new File(fData);
        }
        
        resolve(fobj);
      });
    });
  }
}

exports = module.exports = HttpRequest;