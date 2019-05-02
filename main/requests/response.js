
class Response {
  constructor({ status, headers, data, json }) {
    this.status = status;
    this.headers = headers;
    this.data = data;
    try {
      this.json = JSON.parse(data)
    }
    catch (e) {
      this.json = null;
    }
  }
}

exports = module.exports = Response;