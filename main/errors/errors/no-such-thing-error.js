
/* global Carolina */

const path = require('path');

const BaseError = require('carolina/main/errors/errors/base-error');

/**
 * class NoSuchThingError
 * Represents an error when a service object is not found.
 */
class NoSuchThingError extends BaseError {
  constructor(serviceName, thing, name) {
    super(`No such ${thing}: ${name}`);
    this.name = 'NoSuchThingError';
    this.description = "A service could not find the requested object or class.";
    this.template = 'carolina/errors/error_types/no_such_thing';
    this.details = {
      serviceName: serviceName,
      thing: thing,
      name: name
    };
  }
}

exports = module.exports = NoSuchThingError;