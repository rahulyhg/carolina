
/* global Carolina */

const fs = require('fs-extra');

class File {
  
  constructor(data={}) {
    this.drive = data.drive || "temp";
    this.path = data.path || null;
  }
  
  async exists() {
    return await Carolina.$("Files").drives[this.drive].exists(this.path);
  }
  
  getFullPath() {
    return Carolina.$("Files").drives[this.drive].getFullPath(this.path);
  }
  
  async copyTo(drive, path, overwrite=false) {
    
    let bytes = await this.getBytes();
    
    let method = "writeFile";
    if (overwrite) method = "overwriteFile";
    
    let data = await this.getBytes();
    await Carolina.$("Files").drives[drive][method](path, data);
  }
  
  async getBytes() {
    return await Carolina.$("Files").drives[this.drive].readFile(this.path);
  }
  async getAsString() {
    let bytes = await this.getBytes();
    return bytes.toString();
  }
}

exports = module.exports = File;