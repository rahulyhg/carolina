
const crypto = require('crypto');

const BaseMiddleware = require('carolina/main/http/middleware/base-middleware');

/**
 * CookieEncryptionMiddleware
 * Encrypts cookies, adding carolina- to the front of the cookie key.
 * Decrypts on the way in, stripping off "carolina-".
 */
class CookieEncryptionMiddleware extends BaseMiddleware {
  
  async before(request, data) {
    
    // console.log(request.cookies);
    
    // let exemptCookies = Carolina.config("http.unencrypted_cookies") || [];
    
    for (let cookieKey in request.cookies) {
      
      if (cookieKey.startsWith("carolina")) {
        try {
          let decipher = crypto.createDecipher("AES-256-CBC-HMAC-SHA256",
            Carolina.config("app.secret"));
          let decrypted = decipher.update(request.cookies[cookieKey], "hex",
            "utf8");
          
          decrypted += decipher.final("utf8");
          request.cookies[cookieKey.slice('carolina-'.length)] = decrypted;
          
          delete request.cookies[cookieKey];
        }
        catch(e) {
          // console.log(e, cookieKey);
        }
      }
      
    }
    return request; 
  }
  async after(request, response, data) {
    
    let exemptCookies = Carolina.config("http.unencrypted_cookies") || [];
    
    if (response.shouldSetCookies) {
      for (let cookieKey in response.cookies) {
        
        /* global Carolina */
        
        if (exemptCookies.indexOf(cookieKey) !== -1) continue;
       
        let cipher = crypto.createCipher("AES-256-CBC-HMAC-SHA256",
          Carolina.config("app.secret"));
        let encrypted = cipher.update(response.cookies[cookieKey], "utf8",
          "hex");
        
        encrypted += cipher.final("hex");
        response.cookies[`carolina-${cookieKey}`] = encrypted;
        
        delete response.cookies[cookieKey];
      }
    }
    return response;
  }
}

exports = module.exports = CookieEncryptionMiddleware;