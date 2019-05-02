
const BaseController = require('carolina/main/http/controllers/base-controller');

/**
 * class {{ name }}
 * Represents an Http handler.
 */
class {{ name }} extends BaseController {
  
  constructor() {
    super();
  }
  
  /**
   * Gets a request and returns a response.
   *
   * @param  request  carolina/main/http/http-request  The incoming HttpRequest.
   * @param  data     Object                           User-defined data for the route.
   * 
   * @return response carolina/main/http/http-response The response to return.
   */
  async handle(request, data={}) {
    return this.sendText("Hello, world!");
  }
}

exports = module.exports = {{ name }};