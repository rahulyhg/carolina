
const axios = require('axios');

const BaseBrowser = require('carolina/main/requests/browsers/base-browser');

const Response = require('carolina/main/requests/response');

class AxiosBrowser extends BaseBrowser {
  
  constructor() {
    super();
  }
  
  configure(conf, name) {
    super.configure(conf, name);
  }
  
  async request({ method, url, params, headers, data }) {
    
    headers = headers || {};
    params = params || {};
    data = data || '';
    
    let axiosResponse = await axios({
      method,
      data,
      responseType: 'text',
      url: this.baseUrl + url,
      headers: { ...this.defaultHeaders, ...headers },
      params: { ...this.defaultParams, ...params }
    });
    
    return new Response({
      status: axiosResponse.status,
      data: axiosResponse.data,
      headers: axiosResponse.headers
    });
  }
}

exports = module.exports = AxiosBrowser;