
/* global Carolina */

const path = require('path');

const BaseFileDriver = require('carolina/main/files/file-drivers/base-file-driver');

class S3FileDriver extends BaseFileDriver {
  
  constructor() {
    super();
  }
  
  configure(obj, name) {
    
    super.configure(obj, name);
    
    const AWS = require('aws-sdk');
    
    let profile = obj.profile || Carolina.config("carolina_aws.profile", "default");
    let credentials = new AWS.SharedIniFileCredentials({ profile });
    let region = obj.region || Carolina.config("carolina_aws.region", "us-east-1");
    
    this.bucketName = obj.bucketName;
    this.isPublic = obj.isPublic || false;
    this.publicUrlPrefix = obj.publicUrlPrefix || "";
    this.conn = new AWS.S3({ credentials, region });
    
    if (!this.publicUrlPrefix.endsWith('/')) {
      this.publicUrlPrefix = this.publicUrlPrefix + '/';
    }
  }
  
  getPublicUrl(filepath) {
    if (filepath.startsWith('/')) filepath = filepath.slice(1);
    return this.publicPrefix + filepath;
  }
  
  async exists(filepath, throwError=false) {
    
    if (filepath.startsWith('/')) filepath = filepath.slice(1);
    
    return new Promise((resolve, reject) => {
      this.conn.getObjectAcl({
        Bucket: this.bucketName,
        Key: filepath
      }, (err, data) => {
        if (err) {
          if (throwError) {
            
            let FileNotFoundError = Carolina.$('Errors')._errorClass(
              'FileNotFoundError');
            let err = new FileNotFoundError(filepath, this.name);
            
            throw err;
          }
          else {
            resolve(false);
          }
        }
        else {
          resolve(true);
        }
      });
    });
  }
  
  async listFiles(prefix="") {
    
    if (prefix.startsWith('/')) prefix = prefix.slice(1);
    
    let params = { Bucket: this.bucketName };
    if (prefix) {
      params.Prefix = prefix;
    }
    
    return new Promise((resolve, reject) => {
      this.conn.listObjects(params, (err, data) => {
        if (err) reject(err);
        else {
          
          let results = [];
          
          for (let i = 0; i < data.Contents.length; ++i) {
            if (!data.Contents[i].Key.endsWith('/')) {
              results.push(data.Contents[i].Key);
            }
          }
          
          resolve(results);
        }
      });
    });
  }
  
  async readFile(filepath) {
    
    if (filepath.startsWith('/')) filepath = filepath.slice(1);
    
    await this.exists(filepath, true);
    
    return new Promise((resolve, reject) => {
      this.conn.getObject({
        Bucket: this.bucketName,
        Key: filepath
      }, (err, data) => {
        if (err) reject(err);
        else {
          resolve(data.Body);
        }
      });
    });
  }
  
  async appendToFile(filepath, data) {
    
    await this.exists(filepath, true);

    let prevBuffer = await this.readFile(filepath);
    
    let buf = prevBuffer + data;
    return await this.overwriteFile(filepath, buf);
  }
  
  async writeFile(filepath, data) {
    
    if (filepath.startsWith('/')) filepath = filepath.slice(1);
    let exists = await this.exists(filepath);
    
    if (exists) {
      
      let FileExistsError = Carolina.$('Errors')._errorClass(
        'FileExistsError');
      let err = new FileExistsError(filepath, this.name);
      
      throw err;
    }
    else {
      
      return new Promise((resolve, reject) => {
        this.conn.putObject({
          Bucket: this.bucketName,
          Key: filepath,
          Body: data
        }, (err, data) => {
          if (err) {
            reject(err);
          }
          else {
            resolve(true);
          }
        });
      });
    }
  }
  
  async overwriteFile(filepath, data) {
    
    if (filepath.startsWith('/')) filepath = filepath.slice(1);
      
    return new Promise((resolve, reject) => {
      this.conn.putObject({
        Bucket: this.bucketName,
        Key: filepath,
        Body: data
      }, (err, data) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(true);
        }
      });
    });
  }
  
  async deleteFile(filepath, data) {
    
    if (filepath.startsWith('/')) filepath = filepath.slice(1);
    
    return new Promise((resolve, reject) => {
      this.conn.deleteObject({
        Bucket: this.bucketName,
        Key: filepath
      }, (err, data) => {
        if (err) {
          resolve(false);
        }
        else {
          resolve(true);
        }
      });
    });
  }
}

exports = module.exports = {
  'Carolina/AWS/S3FileDriver': S3FileDriver
};