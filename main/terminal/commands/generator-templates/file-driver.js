
const fs = require('fs-extra');
const path = require('path');

const BaseFileDriver = require('carolina/main/files/file-drivers/base-file-driver');

class {{ name }} extends BaseFileDriver {
  
  constructor() {
    super();
  }
  
  configure(obj, name) {
    
    super(obj, name);
    
    // obj is what is specified in config/files.js
    // this will be called by the Files Service
  }
  
  /**
   * Returns true if the given file exists.
   * If throwError is true, a FileNotFoundError is thrown.
   */
  async exists(filepath, throwError=false) {
    
    // determine if file exists
    let fileExists = false;
    
    if (fileExists) {
      return true;
    }
    
    // file does not exist
    
    if (throwError) {
      let FileNotFoundError = Carolina.$('Files')._errorClass(
        'FileNotFoundError');
      throw new FileNotFoundError(filepath, this.name);
    }
    
    return false;
  }
  
  /**
   * Returns a list of filepaths for all existing files according to this driver.
   */
  async listFiles(filepath) {
    // recursively list all files in directory
  }
  
  /**
   * Returns the bytes of the file.
   */
  async readFile(filepath) {
    // return file contents as Buffer
  }
  
  /**
   * Returns true after adding the data to the end of the existing file.
   * Throws an error if the file does not exist.
   */
  async appendToFile(filepath, data) {
    await this.exists(filepath, true);
    // append data to the file
  }
  
  /**
   * Returns true after writing the data to the file.
   * Throws an error if the file alreaay exists.
   */
  async writeFile(filepath, data) {
    
    let fileExists = await this.exists(filepath);
    if (fileExists) {
      let FileExistsError = Carolina.$('Errors')._errorClass(
        'FileExistsError');
      let err = new FileExistsError(filepath, this.name);
      
      throw err;
    }
    
    // write the file
  }
  
  /**
   * Returns true after writing the data to the file.
   * Will overwrite the file if it exists.
   */
  async overwriteFile(filepath, data) {
    // write the file, overwrite if exists
  }
  
  /**
   * Returns true after deleting the existing file.
   * Returns false if the file does not exist.
   * Throws an error if the file cannot be deleted but exists.
   */
  async deleteFile(filepath, data) {
    
    let fileExisted = await this.exists(filepath);
    
    // delete the file if it existed
    
    if (fileExisted) {
      return true;
    }
    else {
      return false;
    }
  }
}

exports = module.exports = {{ name }};