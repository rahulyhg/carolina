
const status = require('http-status');

/**
 * class HttpResponse
 * Represents an HTTP Response.
 */
class HttpResponse {
  
  constructor(data) {
    
    data = Object.assign({
      status: 200,
      body: ""
    }, data);
    
    this.status = data.status;
    this.body = data.body;
    
    this.statusText = status[this.status];
    
    this.headers = data.headers || {};
    this.cookies = {};
    this.session = {};
    
    this.middlewareCompleted = [];
    
    this.shouldClearCookies = false;
    this.shouldDownload = false;
    this.shouldRedirect = false;
    this.shouldSetCookies = false;
    
    this.downloadFilePath = null;
    this.downloadFileName = null;
  }
  
  setStatus(n) {
    this.status = n;
    this.statusText = status[n];
  }
  
  setHeader(h, v) {
    this.headers[h] = v;
  }
  
  setHeaders(o) {
    this.headers = Object.assign(this.headers, o);
  }
  
  clearCookies() {
    this.shouldClearCookies = true;
  }
  
  setDownload(filepath, as, status=200) {
    this.shouldDownload = true;
    this.downloadFilePath = filepath;
    this.downloadFileName = as;
  }
  
  redirect(location, status=302) {
    this.status = status;
    this.shouldRedirect = true;
    this.redirectTo = location;
  }
  
  setCookieValue(key, value) {
    
    this.shouldSetCookies = true;
    
    this.cookies[key] = value;
  }
  
  setSessionValue(key, value) {
    this.session[key] = value;
  }
  
  flash(message, title=null, severity="primary") {
    
    if (!this.session.hasOwnProperty("flash_messages")) {
      this.session.flash_messages = [];
    }
    
    let flashMessage = {
      message: message,
      severity: severity,
      title: title
    };
    this.session.flash_messages.push(flashMessage);
  }
}

exports = module.exports = HttpResponse;