
const crypto = require('crypto');

const moment = require('moment');

exports = module.exports = () => {
  return crypto.randomBytes(8).toString("hex") + moment().format();
};