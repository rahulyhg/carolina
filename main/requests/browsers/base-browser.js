
class BaseBrowser {
  
  constructor(conf, name) {
    
  }
  
  configure(conf, name) {
    this.name = name;
    
    conf = {
      baseUrl: '',
      defaultHeaders: {},
      defaultParams: {},
      defaultData: {},
      ...conf
    };
    
    this.baseUrl = conf.baseUrl
    this.defaultHeaders = conf.defaultHeaders;
    this.defaultParams = conf.defaultParams;
    this.defaultData = conf.defaultData;
  }
  
  async request({ method, url, headers }) {
    
  }
  
  async get({ url, headers, params }) {
    return await this.request({ url, headers, params, method: 'GET' });
  }
  async post({ url, headers, params, data }) {
    return await this.request({ url, headers, params, data, method: 'POST' });
  }
  async put({ url, headers, params, data }) {
    return await this.request({ url, headers, params, data, method: 'PUT' });
  }
  async patch({ url, headers, params, data }) {
    return await this.request({ url, headers, params, data, method: 'PATCH' });
  }
  async delete({ url, headers, params }) {
    return await this.request({ url, headers, params, method: 'DELETE' });
  }
}

exports = module.exports = BaseBrowser;