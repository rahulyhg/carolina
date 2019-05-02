
class BaseError extends Error {
  constructor(msg) {
    super(msg);
    this.description = "This is a Carolina error.";
  }
}

exports = module.exports = BaseError;