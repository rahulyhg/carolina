
/* global Carolina */

const fs = require('fs-extra');
const path = require('path');

const yaml = require('yamljs');

const BaseService = require('carolina/services/base-service');

/**
 * service BaseDatabaseService
 * The base class for the the service DB, which gives access
 * to database connections and models from them.
 */
class DatabaseService extends BaseService {
  
  constructor() {
    
    super("DB");
    
    let carolinaConnections = require('carolina/main/db/connections');
    this._initializeLibrary('connectionClasses', 'connections', 
      'db/connections', carolinaConnections, 'connection');
    
    let carolinaFields = require('carolina/main/db/fields');
    this._initializeLibrary("fieldClasses", "fields",
      "db/fields", carolinaFields, "field");
      
    let carolinaFixtures = require('carolina/main/db/fixtures');
    this._initializeLibrary('fixturePaths', 'fixtures', 'db/fixtures',
      carolinaFixtures, 'fixture');
    
    let carolinaModels = require('carolina/main/db/models');
    this._initializeLibrary("modelClasses", "models", "db/models",
      carolinaModels, "model");
      
    this.connections = {};
    
    let configConnections = Carolina.config('db.connections', {});
    for (let connectionName in configConnections) {
      let ConnectionClass = this._connectionClass(
        configConnections[connectionName].driver);
      this.connections[connectionName] = new ConnectionClass(
        configConnections[connectionName], connectionName);
    }
    
    this.connectionMap = Carolina.config('db.connectionMap', {});
  }
  
  _connectionClass(name) {
    return this._loadClass(name, 'connectionClasses', 'connection');
  }
  _fieldClass(name) {
    return this._loadClass(name, "fieldClasses", "field");
  }
  _fixturePath(name) {
    return this._loadClass(name, 'fixturePaths', 'fixture');
  }
  _modelClass(name) {
    return this._loadClass(name, "modelClasses", "model class");
  }
  
  async onShutdown() {
    for (let connectionName in this.connections) {
      await this.connections[connectionName].onShutdown();
    }
  }
  
  async applyFixture(fixtureName) {
    
    let Fixture = this._modelClass('Fixture');
    let FixtureRef = this._modelClass('FixtureRef');
    
    Carolina.$('Logger').info(`Apply fixture ${fixtureName}.`, 'DB');
    let fixturePath = this._fixturePath(fixtureName);
    
    let fixture = yaml.load(fixturePath);
    if ('require' in fixture) {
      for (let i = 0; i < fixture.require.length; ++i) {
        await this.applyFixture(fixture.require[i]);
      }
    }
    if (!('exec' in fixture)) {
      
      Carolina.$('Logger').error(
        `Nothing else to do for fixture ${fixtureName}.`,
        'DB');
      
      return;
    }
    
    let refs = {};
    let overallCounts = {};
    
    for (let i = 0; i < fixture.exec.length; ++i) {
      
      let fixtureRecord = await Fixture.$get({
        name: fixtureName,
        group: fixture.exec[i]
      });
      if (fixtureRecord && fixtureRecord.isLoaded) {
        
        Carolina.$('Logger').warn(
          `Fixture ${fixtureName}.${fixtureRecord.group} already loaded.`,
          'DB');
          
        continue;
      }
      
      Carolina.$('Logger').info(
        `Loading fixture ${fixtureName}.${fixture.exec[i]}.`, 'DB');
      
      let groupCounts = {};
      let group = fixture.groups[fixture.exec[i]];
      for (let j = 0; j < group.length; ++j) {
        
        let fixtureItem = group[j];
        let ModelClass = this._modelClass(fixtureItem.model);
        
        let instance = new ModelClass(fixtureItem.fields);
        let instanceId = await instance._save();
        
        if (fixtureItem.ref) {
          
          refs[fixtureItem.ref] = instance;
          let dbRef = new FixtureRef({
            name: fixtureName,
            group: fixture.exec[i],
            ref: fixtureItem.ref,
            model: fixtureItem.model,
            instanceId: instanceId
          });
          
          await dbRef._save();
        }
        
        // apply methods
        if ('methods' in fixtureItem) {
          for (let mi = 0; mi < fixtureItem.methods.length; ++mi) {
            let methodName = fixtureItem.methods[mi].method;
            await instance[methodName](...fixtureItem.methods[mi].args);
          }
        }
        
        await instance._save();
        
        if (fixtureItem.model in groupCounts) {
          groupCounts[fixtureItem.model] = groupCounts[fixtureItem.model] + 1;
        }
        else {
          groupCounts[fixtureItem.model] = 1;
        }
      }
      
      for (let modelName in groupCounts) {
        if (modelName in overallCounts) {
          overallCounts[modelName] = overallCounts[modelName] + groupCounts[modelName];
        }
        else {
          overallCounts[modelName] = groupCounts[modelName];
        }
      }
      
      let fr = new Fixture({
        name: fixtureName,
        group: fixture.exec[i],
        isLoaded: true
      });
      await fr._save();
    }
    
    // print out overall counts
    for (let modelName in overallCounts) {
      Carolina.$('Logger').info(
        `Created ${overallCounts[modelName]} instances of ${modelName}.`, 'DB');
    }
  }
  
  async removeFixture(fixtureName) {
    
    let Fixture = this._modelClass('Fixture');
    let FixtureRef = this._modelClass('FixtureRef');
    
    Carolina.$('Logger').info(`Removing fixture ${fixtureName}.`, 'DB');
    let fixturePath = this._fixturePath(fixtureName);
    
    let fixture = yaml.load(fixturePath);
    if ('require' in fixture) {
      for (let i = fixture.require.length - 1; i >= 0; --i) {
        await this.removeFixture(fixture.require[i]);
      }
    }
    if (!('exec' in fixture)) {
      
      Carolina.$('Logger').error(`Nothing to do for fixture ${fixtureName}.`,
        'DB');
      
      return;
    }
    
    let overallCounts = {};
    
    for (let i = fixture.exec.length - 1; i >= 0; --i) {
      
      let groupCounts = {};
      let group = fixture.groups[fixture.exec[i]];
      
      for (let j = group.length - 1; j >= 0; --j) {
        
        let fixtureItem = group[j];
        
        if (!('ref' in fixtureItem)) {
          continue;
        }
        
        let ModelClass = this._modelClass(fixtureItem.model);
        
        let ref = await FixtureRef.$get({
          name: fixtureName,
          group: fixture.exec[i],
          ref: fixtureItem.ref
        });
        if (ref) {
          
          let instanceId = ref.instanceId;
          let instance = await ModelClass.$lookup(instanceId);
          
          await instance._delete();
          await ref._delete();
          
          if (fixtureItem.model in groupCounts) {
            groupCounts[fixtureItem.model] = groupCounts[fixtureItem.model] + 1;
          }
          else {
            groupCounts[fixtureItem.model] = 1;
          }
        }
      }
      
      for (let modelName in groupCounts) {
        if (modelName in overallCounts) {
          overallCounts[modelName] = overallCounts[modelName] + groupCounts[modelName];
        }
        else {
          overallCounts[modelName] = groupCounts[modelName];
        }
      }
      
      let fr = await Fixture.$get({
        name: fixtureName,
        group: fixture.exec[i]
      });
      if (fr) {
        await fr._delete();
      }
    }
    
    // print out overall counts
    for (let modelName in overallCounts) {
      Carolina.$('Logger').info(
        `Deleted ${overallCounts[modelName]} instances of ${modelName}.`, 'DB');
    }
  }
  
  getConnection(modelName) {
    if (modelName in this.connectionMap) {
      return this.connections[this.connectionMap[modelName]];
    }
    return this.connections['default'];
  }
  
  async _createTable(model, options={}) {
    return await this.getConnection(model).createTable(model, options);
  }
  async _query(model, q, options={}) {
    let results = await this.getConnection(model).query(model, q, options);
    Carolina.$('Logger').silly(
      `Query table ${model} (${results.length} results): ${JSON.stringify(q)}`,
      'DB');
    return results;
  }
  async _all(model, options={}) {
    let results =  await this.getConnection(model).all(model, options);
    Carolina.$('Logger').silly(
      `Query table ${model} (${results.length} results) for ALL items`, 'DB');
    return results;
  }
  async _get(model, q, options={}) {
    let result = await this.getConnection(model).get(model, q, options);
    if (result) {
      Carolina.$('Logger').silly(`Got object ${result._id} from table ${model}`,
      'DB');
    }
    else {
      Carolina.$('Logger').warn(
        `Get object request resulted in 0 results from table ${model}: ${JSON.stringify(q)}`,
        'DB');
    }
    return result;
  }
  async _lookup(model, id, options={}) {
    let result = await this.getConnection(model).lookup(model, id, options);
    if (result) {
      Carolina.$('Logger').silly(`Looked up object ${result._id} from table ${model}`,
      'DB');
    }
    else {
      Carolina.$('Logger').warn(
        `Lookup object request for object ${id} from table ${model} got no result.`,
        'DB');
    }
    return result;
  }
  async _update(model, q, o, options={}) {
    let r = await this.getConnection(model).update(model, q, o, options);
    Carolina.$('Logger').debug(`Update performed against table ${model}.`,
      'DB');
    return r;
  }
  async _create(model, o, options={}) {
    let id = await this.getConnection(model).create(model, o, options); 
    Carolina.$('Logger').debug(
      `New object ${id} added to table ${model}.`, 'DB');
    return id;
  }
  async _delete(model, q, options={}) {
    let num = await this.getConnection(model).delete(model, q, options);
    Carolina.$('Logger').debug(`${num} items deleted from table ${model}`,
      'DB');
    return num;
  }
}

exports = module.exports = DatabaseService;