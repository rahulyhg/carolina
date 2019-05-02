
class BaseConnection {
  
  constructor(obj, name) {
    
  }
  
  async onShutdown() {}
  
  async createTable(model, options={}) {}
  async query(model, q, options={}) {}
  async all(model, options={}) {}
  async get(model, q, options={}) {}
  async lookup(model, id, options={}) {
    return await this.get(model, { _id: id }, options);
  }
  async update(model, q, o, options={}) {}
  async create(model, o, options={}) {}
  async delete(model, q, options={}) {}
}

exports = module.exports = BaseConnection;