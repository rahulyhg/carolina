
/* global Carolina */

const path = require('path');

const walk = require('carolina/_lib/walk');

const BaseError = require('carolina/main/errors/errors/base-error');

/**
 * class TemplateNotFound
 * Represents an error when a template is not found.
 */
class TemplateNotFoundError extends BaseError {
  constructor(template) {
    super(`Template ${template} could not be found.`);
    this.name = 'TemplateNotFoundError';
    this.description = "A template you were looking for could not be found.";
    this.template = 'carolina/errors/error_types/template_not_found';
    this.details = {
      template: template,
      "templates": walk(path.resolve(Carolina.getPath(), "templates"))
    };
  }
}

exports = module.exports = TemplateNotFoundError;