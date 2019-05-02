
/* global Carolina */

const fs = require('fs-extra');

const generateId = require('carolina/_lib/generate-id');

const PromiseFtp = require('promise-ftp');
const PromiseSftp = require('promise-sftp');

const BaseFileDriver = require('carolina/main/files/file-drivers/base-file-driver');

class FtpFileDriver extends BaseFileDriver {
  
  constructor() {
    super();
  }
  
  configure(obj, name) {
    
    super.configure(obj, name);
    
    this.isSftp = obj.isSftp || false;
    this.ftpHost = obj.ftpHost || 'localhost';
    this.ftpUser = obj.ftpUser || null;
    this.ftpPass = obj.ftpPass || null;
    this.isPublic = obj.isPublic || false;
    this.publicPrefix = obj.publicPrefix || '';
    
    this.ftp = new PromiseFtp();
    this.isConnected = false;
  }
  
  getPublicUrl(filepath) {
    if (filepath.startsWith('/')) filepath = filepath.slice(1);
    return this.publicPrefix + filepath;
  }
  
  async connect() {
    if (this.isConnected) {
      return;
    }
    await this.ftp.connect({
      host: this.ftpHost,
      user: this.ftpUser,
      password: this.ftpPass
    });
    this.isConnected = true;
  }
  
  async exists(filepath, throwError=false) {
    
    await this.connect();
    let listResults = await this.ftp.list();
    
    let result = false;
    
    for (let i = 0; i < listResults.length; ++i) {
      if (listResults[i].name == filepath) {
        
        result = true;
        
        break;
      }
    }
    
    if (throwError && result == false) {
      
      let FileNotFoundError = Carolina.$('Errors')._errorClass(
        'FileNotFoundError');
      let err = new FileNotFoundError(filepath, this.name);
      
      throw err;
    }
    
    return result;
  }
  
  async walk(dir="") {
    
    let results = [];
    let list = await this.ftp.list(dir);
    
    for (let i = 0; i < list.length; ++i) {
      let file = dir + '/' + list[i].name;
      if (list[i].type == 'd') {
        let subResults = await this.walk(file);
        results = results.concat(subResults);
      }
      else {
        results.push(file);
      }
    }
    
    return results;
  }
  
  async listFiles(dir="/") {
    await this.connect();
    let results = await this.walk();
    if (dir != "" && dir != "/") {
      let finalResults = [];
      for (let i = 0; i < results.length; ++i) {
        finalResults.push(dir + results[i]);
      }
      return finalResults;
    }
    else {
      return results;
    }
  }
  
  async readStream(stream) {
    return new Promise((resolve, reject) => {
      
      let fname = generateId() + '.dat';
      
      stream.once('close', () => {
        resolve(fs.readFileSync(`./.tmp/${fname}`));
      });
      stream.once('error', reject);
      stream.pipe(fs.createWriteStream(`./.tmp/${fname}`));
    })
  }
  
  async readFile(filepath) {
    
    await this.exists(filepath, true);
    let getResult = await this.ftp.get(filepath);
    
    let result = await this.readStream(getResult);
    return result;
  }
  
  async appendToFile(filepath, data) {
    await this.exists(filepath, true);
    await this.ftp.append(data, filepath);
  }
  
  async writeFile(filepath, data) {
    
    let existsResult = await this.exists(filepath, false);
    if (existsResult) {
      
      let FileExistsError = Carolina.$('Errors')._errorClass(
        'FileExistsError');
      let err = new FileExistsError(filepath, this.name);
      
      throw err;
    }
    
    await this.ftp.put(data, filepath);
  }
  
  async overwriteFile(filepath, data) {
    await this.connect();
    await this.ftp.put(data, filepath);
  }
  
  async deleteFile(filepath) {
    
    let fileExisted = await this.exists(filepath);
    await this.ftp.delete(filepath);
    
    if (fileExisted) {
      return true;
    }
    
    return false;
  }
}

exports = module.exports = FtpFileDriver;