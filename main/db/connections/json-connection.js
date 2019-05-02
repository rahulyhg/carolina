
const fs = require('fs-extra');
const path = require('path');

const generateId = require('carolina/_lib/generate-id');

const BaseConnection = require('carolina/main/db/connections/base-connection');

class JsonConnection extends BaseConnection {
  
  constructor(obj, name) {
    
    super(obj, name);
    
    this.dbPath = obj.path;
    this.db = {};
  }
  
   _loadCollection(model) {
    if (!this.db.hasOwnProperty(model)) {
      if (fs.existsSync(path.resolve(process.cwd(), this.dbPath,
        `${model}.json`))) {
        this.db[model] = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 
          this.dbPath, `${model}.json`)).toString());
      }
      else {
        this.db[model] = [];
      }
    }
  }
  
  _match(q, o, options={}) {
    
    if ('__or' in q) {
      
      let passOr = false;
      
      for (let i = 0; i < q.__or.length; ++i) {
        let isMatch = this._match(q.__or[i], o, options);
        if (isMatch) {
          
          passOr = true;
          
          break;
        }
      }
      
      if (!passOr) return false;
      delete q.__or;
    }
    
    if (('__query' in q) || ('__constraints' in q)) {
      
      if ('__constraints' in q) {
        for (let param in q.__constraints) {
          for (let constraint in q.__constraints[param]) {
            let val = q.__constraints[param][constraint];
            if (constraint == 'not') {
              if (o[param] === val) return false;
            }
            if (constraint == 'gt') {
              if (o[param] <= val) return false;
            }
            if (constraint == 'gte') {
              if (o[param] < val) return false;
            }
            if (constraint == 'lt') {
              if (o[param] >= val) return false;
            }
            if (constraint == 'lte') {
              if (o[param] > val) return false;
            }
            if (constraint == 'contains') {
              if (o[param].indexOf(val) == -1) return false;
            }
          }
        }
      }
      
      // allow next part to proceed as normal
      q = q.__query || {};
    }
    
    for (let param in q) {
      if(o[param] != q[param]) return false;
    }
    
    return true;
  }
  
  async onShutdown() {
    //console.log("Writing db to file.", path.resolve(process.cwd(), this.dbPath));
    fs.ensureDirSync(path.resolve(process.cwd(), this.dbPath));
    for (let model in this.db) {
      // console.log(model);
      fs.writeFileSync(path.resolve(process.cwd(), this.dbPath,
        `${model}.json`), JSON.stringify(this.db[model], null, 2));  
    }
  }
  
  async createTable(model, options={}) {
    fs.ensureDirSync(path.resolve(process.cwd(), this.dbPath));
    fs.writeFileSync(path.resolve(process.cwd(), this.dbPath,
      `${model}.json`), "[]");
  }
  
  async query(model, q, options={}) {
    
    this._loadCollection(model);
    
    let matches = [];
    
    for (let i = 0; i < this.db[model].length; ++i) {
      if (this._match(q, this.db[model][i])) {
        matches.push(this.db[model][i]);
      }
    }
    
    if (options.pageNumber) {
      
      let pageSize = 10;
      if ('pageSize' in options) pageSize = options.pageSize;
      let start = (options.pageNumber - 1) * pageSize;
      let stop = options.pageNumber * pageSize;
      
      let results = [];
      for (let i = start; i < stop && i < matches.length; ++i) {
        results.push(matches[i]);
      }
      
      return results;
    }
    return matches;
  }
  
  async all(model, options={}) {

    this._loadCollection(model);

    if (options.pageNumber) {
      
      let pageSize = 10;
      if ('pageSize' in options) pageSize = options.pageSize;
      let start = (options.pageNumber - 1) * pageSize;
      let stop = options.pageNumber * pageSize;

      let results = [];
      for (let i = start; i < stop && i < this.db[model].length; ++i) {
        results.push(this.db[model][i]);
      }

      return results;
    }

    return this.db[model];
  }
  
  async get(model, q, options={}) {
    
    this._loadCollection(model);
    
    for (let i = 0; i < this.db[model].length; ++i) {
      if (this._match(q, this.db[model][i])) {
        return this.db[model][i];
      }
    }
    
    return null;
  }
  
  async lookup(model, id, options={}) {
    
    this._loadCollection(model);
    let collection= this.db[model];
    
    for (let i = 0; i < collection.length; ++i) {
      if (collection[i]._id == id) {
        return collection[i];
      }
    }
    
    return null;
  }
  
  async update(model, q, o, options={}) {
    
    this._loadCollection(model);
    let collection = this.db[model];
    
    for (let i = 0; i < collection.length; ++i) {
      if (this._match(q, collection[i])) {
        collection[i] = Object.assign(collection[i], o);
      }
    }
    
    return;
  }
  
  async create(model, o, options={}) {
    
    this._loadCollection(model);
    let collection = this.db[model];
    
    o._id = generateId();
    collection.push(o);
    
    return o._id;
  }
  
  async delete(model, q, options={}) {
    
    this._loadCollection(model);
    let collection = this.db[model];
    
    let count = 0;
    
    let cont = true;
    
    while (cont) {
      
      cont = false;
      
      let delIndex = null;
      
      for (let i = 0; i < collection.length; ++i) {
        if (this._match(q, collection[i])) {
          
          delIndex = i;
          
          cont = true;
          
          break;
        }
      }
      
      if (cont) {
        collection.splice(delIndex, 1);
        ++count;
      }
    }
    
    return count;
  }
}

exports = module.exports = JsonConnection;