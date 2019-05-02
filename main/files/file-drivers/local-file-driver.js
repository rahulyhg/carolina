
/* global Carolina */

const fs = require('fs-extra');
const path = require('path');

const BaseFileDriver = require('carolina/main/files/file-drivers/base-file-driver');

const walk = require('carolina/_lib/walk');

class LocalFileDriver extends BaseFileDriver {
  
  constructor() {
    super();
  }
  
  configure(obj, name) {
    
    super.configure(obj, name);
    
    this.basepath = obj.basepath || path.resolve(process.cwd(), ".tmp");
    this.isPublic = obj.isPublic || false;
    this.publicPrefix = obj.publicPrefix || '';
    fs.ensureDirSync(this.basepath);
  }
  
  getPublicUrl(filepath) {
    if (filepath.startsWith('/')) filepath = filepath.slice(1);
    return this.publicPrefix + filepath;
  }
  
  getFullPath(filepath) {
    return path.join(this.basepath, filepath);
  }
  
  async exists(filepath, throwError=false) {
    let result = await fs.exists(path.join(this.basepath, filepath));
    if (throwError && result == false) {
      
      let FileNotFoundError = Carolina.$('Errors')._errorClass(
        'FileNotFoundError');
      let err = new FileNotFoundError(filepath, this.name);
      
      throw err;
    }
  }
  async listFiles(dir="/") {
    let results = walk(path.join(this.basepath + dir));
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
  async readFile(filepath) {
    return await fs.readFile(path.join(this.basepath, filepath));
  }
  async appendToFile(filepath, data) {
    return await fs.appendFile(path.join(this.basepath, filepath), data);
  }
  async writeFile(filepath, data) {
    
    let fileExists = await this.exists(filepath);
    let fileDir = filepath.split("/");
    
    fileDir.pop();
    fs.ensureDirSync(path.join(this.basepath, fileDir.join("/")));
    
    if (fileExists) {
      throw `File ${filepath} exists.`;
    }
    else {
      
      await fs.writeFile(path.join(this.basepath, filepath), data);
      
      return true;
    }
  }
  async overwriteFile(filepath, data) {
    
    await fs.writeFile(path.join(this.basepath, filepath), data);
    
    return true;
  }
  async deleteFile(filepath) {
    let fileExists = await this.exists(filepath);
    if (fileExists) {
      
      await fs.unlink(path.join(this.basepath, filepath));
      
      return true;
    }
    else {
      return false;
    }
  }
}

exports = module.exports = LocalFileDriver;