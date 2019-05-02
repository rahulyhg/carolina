
/* global Carolina */

const path = require('path');

const BaseError = require('carolina/main/errors/errors/base-error');

/**
 * class FileNotFoundError
 * Represents an error when a file cannot be found in a driver.
 */
class FileNotFoundError extends BaseError {
  constructor(filepath, drive) {
    super(`No such file in driver ${drive}: ${filepath}`);
    this.name = 'FileNotFoundError';
    this.description = "The Files Service could not find a requested file.";
    this.template = 'carolina/errors/error_types/file_not_found';
    this.details = {
      filepath,
      drive
    };
  }
}

exports = module.exports = FileNotFoundError;