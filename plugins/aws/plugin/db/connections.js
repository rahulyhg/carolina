
/* global Carolina */

const generateTimeId = require('carolina/_lib/generate-time-id');

const BaseConnection = require('carolina/main/db/connections/base-connection');

class DynamoDBConnection extends BaseConnection {
  
  constructor(obj, name) {
    
    super(obj, name);
    
    const AWS = require('aws-sdk');
    
    let profile = obj.profile || Carolina.config("carolina_aws.profile", "default");
    let credentials = new AWS.SharedIniFileCredentials({ profile });
    let region = obj.region || Carolina.config("carolina_aws.region", "us-east-1");
    
    this.tableName = obj.tableName;
    this.conn = new AWS.DynamoDB({ credentials, region });
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
  
  objToDynamoForm(obj) {
    
    let newObj = {};
    
    for (let key in obj) {
      
      let val = this.valToDynamoForm(obj[key]);
      newObj[key] = val;
    }
    
    return newObj;
  }
  valToDynamoForm(val) {
    
    if (val == null || val == undefined) {
      return { NULL: true };
    }
    else if (val.constructor.name == 'String') {
      return { S: val };
    }
    else if (val.constructor.name == 'Number') {
      return { N: val.toString() };
    }
    else if (val.constructor.name == 'Boolean') {
      return { BOOL: val };
    }
    else if (val.constructor.name == 'Array') {
      
      let ls = [];
      for (let i = 0; i < val.length; ++i) {
        ls.push(this.valToDynamoForm(val[i]));
      }
      
      return { L: ls };
    }
    else if (val.constructor.name == 'Object') {
      return { M: this.objToDynamoForm(val) };
    }
    else {
      return null;
    }
  }
  
  objFromDynamoForm(obj) {
    
    let newObj = {};
    
    for (let key in obj) {
      
      if (key == 'model') {
        continue;
      }
      else if (key == 'id') {
        newObj._id = this.valFromDynamoForm(obj.id);
      }
      else {
        newObj[key] = this.valFromDynamoForm(obj[key]);
      }
    }
    
    return newObj;
  }
  valFromDynamoForm(val) {
    if ('NULL' in val && val.NULL == true) {
      return null;
    }
    else if ('S' in val) {
      return val.S;
    }
    else if ('N' in val) {
      return Number(val.N);
    }
    else if ('BOOL' in val) {
      return val.BOOL;
    }
    else if ('L' in val) {
      
      let ls = [];
      for (let i = 0; i < val.L.length; ++i) {
        ls.push(this.valFromDynamoForm(val.L[i]));
      }
      
      return ls;
    }
    else if ('M' in val) {
      return this.objFromDynamoForm(val.M);
    }
    else {
      return null;
    }
  }
  
  async createTable(model, options={}) {
    return;
  }
  
  async query(model, queryObj, options={}) {
    
    let ExpressionAttributeValues = {
      ":v1": { S: model }
    };
    let KeyConditionExpression = "model = :v1";
    let q = {
      ExpressionAttributeValues,
      KeyConditionExpression,
      TableName: this.tableName
    };
    
    let done = false;
    let lastProcessedKey = null;
    let allResults = [];
    
    while (done != true) {
      
      let theseResults = [];
      
      if (lastProcessedKey == null) {
        let results = await this._allPage(q);
        theseResults = results[0];
        lastProcessedKey = results[1];
      }
      else {
        
        q.ExclusiveStartKey = lastProcessedKey;
        let results = await this._allPage(q);
        
        theseResults = results[0];
        lastProcessedKey = results[1];
      }
      
      for (let i = 0; i < theseResults.length; ++i) {
        if (this._match(queryObj, theseResults[i])) {
          allResults.push(theseResults[i]);
        }
      }
      
      if (lastProcessedKey == null) {
        done = true;
      }
    }
    
    return allResults;
  }
  
  // helper for all() pagination
  async _allPage(q, lastKey=null) {
    return new Promise((resolve, reject) => {
      this.conn.query(q, (err, data) => {
        if (err) reject(err);
        else {
          
          let results = [];
          for (let i = 0; i < data.Items.length; ++i) {
            results.push(this.objFromDynamoForm(data.Items[i]));
          }
          let lastProcessedKey = null;
          
          if (data.LastEvaluatedKey) {
            lastProcessedKey = data.LastEvaluatedKey;
          }
          
          resolve([results, lastProcessedKey]);
        }
      })
    })
  }
  
  async all(model, options={}) {
    
    let ExpressionAttributeValues = {
      ":v1": { S: model }
    };
    let KeyConditionExpression = "model = :v1";
    let q = {
      ExpressionAttributeValues,
      KeyConditionExpression,
      TableName: this.tableName
    };
    
    let done = false;
    let lastProcessedKey = null;
    let allResults = [];
    
    while (done != true) {
      
      if (lastProcessedKey == null) {
        let results = await this._allPage(q);
        allResults = [...allResults, ...results[0]];
        lastProcessedKey = results[1];
      }
      else {
        
        q.ExclusiveStartKey = lastProcessedKey;
        let results = await this._allPage(q);
        
        allResults = [...allResults, ...results[0]];
        lastProcessedKey = results[1];
      }
      
      if (lastProcessedKey == null) {
        done = true;
      }
    }
    
    return allResults;
  }
  
  async get(model, queryObj, options={}) {
    
    let ExpressionAttributeValues = {
      ":v1": { S: model }
    };
    let KeyConditionExpression = "model = :v1";
    let q = {
      ExpressionAttributeValues,
      KeyConditionExpression,
      TableName: this.tableName
    };
    
    let done = false;
    let lastProcessedKey = null;
    
    while (done != true) {
      
      let theseResults = [];
      
      if (lastProcessedKey == null) {
        let results = await this._allPage(q);
        theseResults = results[0];
        lastProcessedKey = results[1];
      }
      else {
        
        q.ExclusiveStartKey = lastProcessedKey;
        let results = await this._allPage(q);
        
        theseResults = results[0];
        lastProcessedKey = results[1];
      }
      
      for (let i = 0; i < theseResults.length; ++i) {
        if (this._match(queryObj, theseResults[i])) {
          return theseResults[i];
        }
      }
      
      if (lastProcessedKey == null) {
        done = true;
      }
    }
    
    return null;
  }
  
  async lookup(model, id, options={}) {
    
    let ExpressionAttributeValues = {
      ":v1": { S: model },
      ":v2": this.valToDynamoForm(id.toString())
    };
    let KeyConditionExpression = "model = :v1 AND id = :v2";
    
    return new Promise((resolve, reject) => {
      this.conn.query({
        ExpressionAttributeValues,
        KeyConditionExpression,
        TableName: this.tableName
      }, (err, data) => {
        if (err) reject(err);
        else {
          if (data.Items.length > 0) {
            let obj = this.objFromDynamoForm(data.Items[0]);
            resolve(obj);
          }
          else {
            resolve(null);
          }
        }
      });
    });
  }
  
  async _updateOne(model, _id, update) {
    
    let obj = {
      ...this.objToDynamoForm(update),
      model: { S: model },
      id: { S: _id }
    };
    
    return new Promise((resolve, reject) => {
      this.conn.putItem({
        Item: obj,
        TableName: this.tableName
      }, (err, data) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
  
  async update(model, q, o, options={}) {
    let results = await this.query(model, q);
    for (let i = 0; i < results.length; ++i) {
      let newObj = {
        ...results[i],
        ...o
      };
      let _id = newObj._id;
      delete newObj['_id'];
      await this._updateOne(model, _id, newObj);
    }
  }
  
  async create(model, o, options={}) {
    
    let newId = generateTimeId();
    let obj = this.objToDynamoForm(o);
    
    obj = {
      ...obj,
      model: { S: model },
      id: { S: newId }
    };
    
    return new Promise((resolve, reject) => {
      this.conn.putItem({
        Item: obj,
        TableName: this.tableName
      }, (err, data) => {
        if (err) reject(err);
        else resolve(newId);
      });
    });
  }
  
  async _deleteOne(model, id) {
    
    return new Promise((resolve, reject) => {
      this.conn.deleteItem({
        Key: {
          model: { S: model },
          id: { S: id }
        },
        TableName: this.tableName
      }, (err, data) => {
        if (err) reject(err);
        else resolve(true);
      })
    });
  }
  
  async delete(model, q, options={}) {
    
    let results = await this.query(model, q);
    let count = 0;
    for (let i = 0; i < results.length; ++i) {
      
      let _id = results[i]._id;
      let deleted = await this._deleteOne(model, _id);
      
      if (deleted) ++count;
    }
    
    return count;
  }
}

exports = module.exports = {
  'Carolina/AWS/DynamoDBConnection': DynamoDBConnection
};