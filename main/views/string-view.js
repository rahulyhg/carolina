
const HttpResponse = require('carolina/main/http/http-response')
const BaseView = require('carolina/main/views/base-view');

/**
 * StringView
 * Returns a string.
 */
class StringView extends BaseView {
  
  constructor() {
    super();
  }
  
  /**
   * Creates an HTTP response using provided data.
   */
  make(data) {
    return new HttpResponse({
      body: data.text
    });
  }
}

exports = module.exports = StringView;