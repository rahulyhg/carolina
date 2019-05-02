/**
 * Carolina included middleware
 */
exports = module.exports = {
  ApiMiddleware: require('./api-middleware'),
  BodyParserMiddleware: require('./body-parser-middleware'),
  BrowserMiddleware: require('./browser-middleware'),
  CookieMiddleware: require('./cookie-middleware'),
  CookieEncryptionMiddleware: require('./cookie-encryption-middleware'),
  CsrfMiddleware: require('./csrf-middleware'),
  LogRequestsMiddleware: require('./log-requests-middleware'),
  ModelExtractionMiddleware: require('./model-extraction-middleware'),
  SessionMiddleware: require('./session-middleware')
};