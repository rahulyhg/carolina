
/* global Carolina */

const BaseError = require('carolina/main/errors/errors/base-error');

class FileExistsError extends BaseError {
  constructor(filepath, drive) {
    
    super(`File already exists on drive ${drive}: ${filepath}`);
    
    this.name = "FileExistsError";
    this.description = "Operation could not be completed because the file already exists.";
    this.template = 'carolina/errors/error_types/file_exists';
    this.details = { drive, filepath };
  }
}

exports = module.exports = FileExistsError;