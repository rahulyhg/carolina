
/**
 * class BaseMiddleware
 * Represents a piece of middleware that acts on requests and responses.
 */
class BaseMiddleware {
  
  constructor() {
    
  }
  
  /**
   * Operates on the request before it reaches its destination.
   * 
   * @param  request  carolina/main/http/http-request  The incoming HttpRequest.
   * 
   * @return request  carolina/main/http/http-request  The request to be send to the next middleware or final controller.
   */
  async before(request, data={}) {
    return request;
  }
  
  /**
   * Operates on the request and response after it has been preparted by the controller.
   * 
   * @param  request  carolina/main/http/http-request  The incoming HttpRequest.
   * @param  response carolina/main/http/http-response The outgoing HttpResponse.
   * 
   * @return response carolina/main/http/http-response The response to be sent to the next middleware or the client.
   */
  async after(request, response, data={}) {
    return response;
  }
}

exports = module.exports = BaseMiddleware;