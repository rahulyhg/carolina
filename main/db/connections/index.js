
/**
 * Carolina database connections.
 */

const JsonConnection = require('./json-connection');
const MongoDbConnection = require('./mongodb-connection');
 
exports = module.exports = {
  JsonConnection,
  MongoDbConnection
};