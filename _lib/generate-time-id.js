
const crypto = require('crypto');

const moment = require('moment');

exports = module.exports = () => {
  return moment().format() + crypto.randomBytes(8).toString("hex");
};