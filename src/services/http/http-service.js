
import Cookie from 'js-cookie';

class HttpService {
  
  constructor(config={}) {
    this.config = config;
    this.config.csrfToken = Cookie.get("csrf_token");
  }
  
  async request(url, options) {
    
    let body = options.body || undefined;    
    let method = options.method || "get";
    let headers = options.headers || {};
    
    if (this.config.csrfToken) {
      headers["X-CSRF-TOKEN"] = this.config.csrfToken;
    }

    let res = await fetch(url, {
      body: body,
      credentials: "same-origin",
      headers: headers,
      method: method
    });
    
    return res.json();
  }
  
  async get(url, options={}) {
    options.method = "get";
    return await this.request(url, options);
  }
  async post(url, data={}, options={}) {
    options.body = JSON.stringify(data);
    options.method = "post";
    return await this.request(url, options);
  }
}

export default HttpService;