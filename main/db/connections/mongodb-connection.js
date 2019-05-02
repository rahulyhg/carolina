
const mongodb = require('mongodb');

const ObjectID = mongodb.ObjectID;

const BaseConnection = require('carolina/main/db/connections/base-connection');

class MongoDbConnection extends BaseConnection {
  
  constructor(obj, name) {
    
    super(obj, name);
    
    this.host = obj.host || 'localhost';
    this.port = obj.port || 27017;
    this.dbName = obj.dbName || 'main';
    this.clientOptions = obj.options || {};
    this.url = `mongodb://${this.host}:${this.port}`;
    
    this.isConnected = false;
    this.conn = null;
  }
  
  async connect() {
    
    if (this.isConnected) {
      return this.conn;
    }
    
    return new Promise((resolve, reject) => {
      
      const MongoClient = mongodb.MongoClient;
      MongoClient.connect(this.url, this.clientOptions, (err, client) => {
        
        if (err != null) { return reject(err) };
        
        let conn = client.db(this.dbName);
        this.conn = conn;
        this.isConnected = true;
        resolve(this.conn);
      });
    });
  }
  
  getQueryObject(q) {
    
    let qObj = {};
    
    if ('__or' in q) {
      
      let orList = [];
      for (let i = 0; i < q.__or.length; ++i) {
        orList.push(this.getQueryObject(q.__or[i]));
      }
      
      qObj.$or = orList;
      
      delete q.__or;
    }
    if (('__query' in q) || ('__constraints' in q)) {
      if ('__constraints' in q) {
        for (let param in q.__constraints) {
          qObj[param] = {};
          for (let constraint in q.__constraints[param]) {
            let val = q.__constraints[param][constraint];
            if (constraint == 'not') qObj[param].$ne = val;
            if (constraint == 'gt') qObj[param].$gt = val;
            if (constraint == 'gte') qObj[param].$gte = val;
            if (constraint == 'lt') qObj[param].$lt = val;
            if (constraint == 'lte') qObj[param].$lte = val; 
            if (constraint == 'contains') qObj[param].$all = [val];
          }
        }
      }
      
      q = q.__query || {};
    }
    
    for (let param in q) {
      qObj[param] = q[param];
    }
    if ('_id' in qObj) {
      qObj._id = ObjectID(qObj._id);
    }
    
    return qObj;
  }
  
  async onShutdown() {
    if (this.isConnected) {
      // this.conn.close();
    }
  }
  
  async createTable(model, options={}) {
    let conn = await this.connect();
    this.conn.collection(model);
  }
  
  async query(model, q, options={}) {
    
    let conn = await this.connect();
    let col = conn.collection(model);
    
    q = this.getQueryObject(q);
    let results = await col.find(q).toArray();
    
    return results;
  }
  
  async all(model, options={}) {
    return await this.query(model, {});
  }
  
  async get(model, q, options={}) {
    
    let conn = await this.connect();
    let col = conn.collection(model);
    
    q = this.getQueryObject(q);
    return await col.findOne(q);
  }
  
  async lookup(model, id, options={}) {
    return await this.get(model, { _id: id }, options);
  }
  
  async update(model, q, o, options={}) {
    
    let conn = await this.connect();
    let col = conn.collection(model);
    
    if ('_id' in o) {
      delete o._id;
    }
    
    q = this.getQueryObject(q);
    await col.updateMany(q, { $set: o });
    
    return;
  }
  
  async create(model, o, options={}) {
    
    let conn = await this.connect();
    let col = conn.collection(model);
    
    let res = await col.insertOne(o);
    return res.insertedId.toString();
  }
  
  async delete(model, q, options={}) {
    
    let conn = await this.connect();
    let col = conn.collection(model);
    
    q = this.getQueryObject(q);
    let res = await col.deleteMany(q);
    return res.result.n;
  }
}

exports = module.exports = MongoDbConnection;