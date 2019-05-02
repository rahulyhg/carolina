
/* global Carolina */

const crypto = require('crypto');

const BaseService = require('carolina/services/base-service');

/**
 * service CryptoService
 * Provides methods for encrypting and decrypting values using site key.
 */
class CryptoService extends BaseService {

  constructor() {

    super("Crypto");

    this.algorithm = "AES-256-CBC-HMAC-SHA256";
  }

  encryptText(text) {

    let cipher = crypto.createCipher(this.algorithm,
          Carolina.config("app.secret"));
    let crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');

    return crypted;
  }
  
  decryptText(text) {
    
    let decipher = crypto.createDecipher(this.algorithm,
      Carolina.config('app.secret', 'bad_secret'));
    let dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');

    return dec;
  }
}

exports = module.exports = CryptoService;