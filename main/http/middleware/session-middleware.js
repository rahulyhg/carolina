
const BaseMiddleware = require('carolina/main/http/middleware/base-middleware');

class SessionMiddleware extends BaseMiddleware {
  
  constructor() {
    super();
  }
  
  async before(request, data) {
    
    // console.log(request.cookies);
    
    /* global Carolina */

    // console.log("cookies", request.cookies);
    
    if (request.cookies.hasOwnProperty("session")) {
      request.sessionId = request.cookies['session'];
      request.session = await Carolina.$("Session").getSession(
        request.cookies['session']);
      
    }
    else {
      
      // console.log("new session");

      let sessionId = await Carolina.$("Session").newSession(request.session);
      request.sessionId = sessionId;
    }
    
    // console.log(request.sessionId, request.session); 
    
    return request;
  }
  
  async after(request, response, data) {
    
    if (request.cookies.hasOwnProperty("session") && response.session) {
      let sessionId = request.sessionId;
      let session = await Carolina.$("Session").getSession(
        sessionId);
      // clear old flash_messages
      if (session.hasOwnProperty("flash_messages")) {
        delete session.flash_messages;
      }
      // console.log("saving session", Object.assign(session, response.session));
      await Carolina.$("Session").saveSession(sessionId,
        Object.assign(session, response.session))
    }
    else {
      // let 
      response.setCookieValue("session", request.sessionId);
      if (response.session) {
        // console.log("saving session...", response.session);
        await Carolina.$("Session").saveSession(request.sessionId,
          response.session);
      }
    }
    
    return response;
  }
}

exports = module.exports = SessionMiddleware;