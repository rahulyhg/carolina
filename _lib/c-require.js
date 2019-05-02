
const path = require('path');

module.exports = (p) => {
  if (p.startsWith(".")) {
    return require(path.resolve(process.cwd(), p));
  }
  else return require(p);
};