
/* global Carolina */

const fs = require('fs-extra');
const path = require('path');

const dropbox = require('dropbox');
const isomorphicFetch = require('isomorphic-fetch');

const generateId = require('carolina/_lib/generate-id');

const BaseFileDriver = require('carolina/main/files/file-drivers/base-file-driver');

class DropboxFileDriver extends BaseFileDriver {
  
  constructor() {
    super();
  }
  
  configure(obj, name) {
    
    super.configure(obj, name);
    
    this.dbx = new dropbox.Dropbox({
      accessToken: obj.accessToken,
      fetch: isomorphicFetch
    });
  }
  
  async exists(filepath, throwError=false) {
    
    if (!filepath.startsWith('/')) filepath = '/' + filepath;
    let dirpath = path.dirname(filepath);
    
    if (dirpath == '/') dirpath = '';
    
    let results = await this.dbx.filesListFolder({ path: dirpath });
    for (let i = 0; i < results.entries.length; ++i) {
      if (results.entries[i].path_lower == filepath || results.entries[i].path_display == filepath) {
        return true;
      }
    }
    
    if (throwError) {
      
      let FileNotFoundError = Carolina.$('Errors')._errorClass(
        'FileNotFoundError');
      let err = new FileNotFoundError(filepath, this.name);
      
      throw err;
    }
    
    return false;
  }
  
  async walk(dir='') {
    
    let results = [];
    let listResults = await this.dbx.filesListFolder({ path: dir });
    let list = listResults.entries;
    for (let i = 0; i < list.length; ++i) {
      let file = list[i].path_display;
      if (list[i]['.tag'] == "folder") {
        let subResults = await this.walk(file);
        results = results.concat(subResults);
      }
      else {
        results.push(file);
      }
    }
    
    return results;
  }
  
  async listFiles(dir='') {
    return await this.walk(dir);
  }
  
  async readStream(stream) {
    return new Promise((resolve, reject) => {
      
      let fname = generateId() + '.dat';
      let str = fs.createWriteStream(`./.tmp/${fname}`)
      
      stream.once('end', () => {
        str.end();
      });
      stream.once('error', reject);
      stream.pipe(str);
      
      str.once('finish', () => {
        resolve(fs.readFileSync(`./.tmp/${fname}`))
      });
    })
  }
  
  async readFile(filepath) {
    
    if (!filepath.startsWith('/')) filepath = '/' + filepath;
    await this.exists(filepath, true);
    let tempLinkResults = await this.dbx.filesGetTemporaryLink({
      path: filepath
    });
    
    let res = await isomorphicFetch(tempLinkResults.link);
    let b = await this.readStream(res.body);
    return b;
  }
  
  // append
  async appendToFile(filepath, data) {
    
    await this.exists(filepath, true);

    let prevBuffer = await this.readFile(filepath);
    
    let buf = prevBuffer + data;
    await this.overwriteFile(filepath, buf);
  }
  
  async writeFile(filepath, data) {
    
    let existsResult = await this.exists(filepath, false);
    if (existsResult) {
      
      let FileExistsError = Carolina.$('Errors')._errorClass(
        'FileExistsError');
      let err = new FileExistsError(filepath, this.name);
      
      throw err;
    }
    
    await this.dbx.filesUpload({
      contents: data,
      path: filepath
    });
  }
  
  async overwriteFile(filepath, data) {
    await this.dbx.filesUpload({
      contents: data,
      path: filepath,
      mode: { '.tag': 'overwrite' }
    });
  }
}

exports = module.exports = DropboxFileDriver;