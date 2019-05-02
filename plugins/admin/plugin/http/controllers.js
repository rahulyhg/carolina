
/* global Carolina */

const BaseController = require('carolina/main/http/controllers/base-controller');

class AdminController extends BaseController {

  constructor() {
    super();
  }

  getMiddleware() {
    return [
      'Carolina/Auth/AdminGuardMiddleware'
    ];
  }

  async home(request, data={}) {
    return this.pugTemplate('carolina/admin/base', {}, request);
  }

  // API routes
  async listSections(request, data={}) {
    
    let sections = Carolina.config('carolina_admin.sections', []);
    let includeFileAdmin = Carolina.config('carolina_admin.includeFileAdmin',
      false);
    
    let responseData = [];
    for (let i = 0; i < sections.length; ++i) {
      let sectionData = { title: sections[i].title };
      sectionData.icon = sections[i].icon || 'database';
      sectionData.link = `/section/${i}`;
      responseData.push(sectionData);
    }

    if (includeFileAdmin) {
      responseData.push({
        title: 'File Admin',
        icon: 'file',
        link: `/file-admin`
      });
    }

    return this.sendJSON(responseData);
  }

  async getSection(request, data={}) {

    let sectionIndex = parseInt(request.params.sectionIndex);
    let sections = Carolina.config('carolina_admin.sections', []);

    return this.sendJSON(sections[sectionIndex]);
  }

  async getModelSchema(request, data={}) {

    let sectionIndex = parseInt(request.params.sectionIndex);
    let sections = Carolina.config('carolina_admin.sections', []);
    let modelIndex = parseInt(request.params.modelIndex);
    let Model = Carolina.$('DB')._modelClass(
      sections[sectionIndex].models[modelIndex]);
    
    let ms = Model.prototype.schema.asJSON();
    ms.modelName = sections[sectionIndex].models[modelIndex];
    return this.sendJSON(ms);
  }
  
  async getModelActions(request, data={}) {
    
    let sectionIndex = parseInt(request.params.sectionIndex);
    let sections = Carolina.config('carolina_admin.sections', []);
    let actions = Carolina.config('carolina_admin.modelActions', {});
    let modelIndex = parseInt(request.params.modelIndex);
    let modelName = sections[sectionIndex].models[modelIndex];
    let response = [];
    
    try {
      if (actions.hasOwnProperty(modelName)) {
        if (actions[modelName].hasOwnProperty('collection')) {
          for (let i = 0; i < actions[modelName].collection.length; ++i) {
            
            let a = {};
            let action = Carolina.$('Carolina/Admin')._action(
              actions[modelName].collection[i]);
            
            a.name = action.name;
            a.description = action.description;
            a.schema = Carolina.$('Validation')._schema(
              action.schemaName).asJSON();
            response.push(a);
          }
        }
      }
    }
    catch(e) {
      console.log(e);
    }
    
    return this.sendJSON(response);
  }
  
  async getInstanceActions(request, data={}) {
    
    let sectionIndex = parseInt(request.params.sectionIndex);
    let sections = Carolina.config('carolina_admin.sections', []);
    let actions = Carolina.config('carolina_admin.modelActions', {});
    let modelIndex = parseInt(request.params.modelIndex);
    let modelName = sections[sectionIndex].models[modelIndex];
    let response = [];
    
    try {
      if (actions.hasOwnProperty(modelName)) {
        if (actions[modelName].hasOwnProperty('instance')) {
          for (let i = 0; i < actions[modelName].instance.length; ++i) {
            
            let a = {};
            let action = Carolina.$('Carolina/Admin')._action(
              actions[modelName].instance[i]);
            
            a.name = action.name;
            a.description = action.description;
            a.schema = Carolina.$('Validation')._schema(
              action.schemaName).asJSON();
            response.push(a);
          }
        }
      }
    }
    catch(e) {
      console.log(e);
    }
    
    return this.sendJSON(response);
  }
  
  async doModelAction(request, data={}) {
    
    let sectionIndex = parseInt(request.params.sectionIndex);
    let sections = Carolina.config('carolina_admin.sections', []);
    let actions = Carolina.config('carolina_admin.modelActions', {});
    let modelIndex = parseInt(request.params.modelIndex);
    let actionIndex = parseInt(request.params.actionIndex);
    let modelName = sections[sectionIndex].models[modelIndex];
    let Model = Carolina.$('DB')._modelClass(modelName);
    let actionName = actions[modelName].collection[actionIndex];
    let action = Carolina.$('Carolina/Admin')._action(actionName);
    let val = Carolina.$('Validation').validate(action.schemaName,
      request.data);
      
    if (!val.success) {
      return this.sendJSON(val);
    }
    
    let r = await action.handle(request.data, Model, null);
    return this.sendJSON(r);
  }
  
  async doInstanceAction(request, data={}) {
    
    let sectionIndex = parseInt(request.params.sectionIndex);
    let sections = Carolina.config('carolina_admin.sections', []);
    let actions = Carolina.config('carolina_admin.modelActions', {});
    let modelIndex = parseInt(request.params.modelIndex);
    let actionIndex = parseInt(request.params.actionIndex);
    let modelName = sections[sectionIndex].models[modelIndex];
    let Model = Carolina.$('DB')._modelClass(modelName);
    let instance = await Model.$get({ _id: request.params.id });
    let actionName = actions[modelName].instance[actionIndex];
    let action = Carolina.$('Carolina/Admin')._action(actionName);
    let val = Carolina.$('Validation').validate(action.schemaName,
      request.data);
      
    if (!val.success) {
      return this.sendJSON(val);
    }
    
    let r = await action.handle(request.data, Model, instance);
    return this.sendJSON(r);
  }

  async listModel(request, data={}) {

    let sectionIndex = parseInt(request.params.sectionIndex);
    let sections = Carolina.config('carolina_admin.sections', []);
    let modelIndex = parseInt(request.params.modelIndex);
    let Model = Carolina.$('DB')._modelClass(
      sections[sectionIndex].models[modelIndex]);
    let pageNumber = parseInt(request.params.pageNumber);

    let results = await Model.$all({
      pageNumber,
      pageSize: 20
    });
    
    let response = [];

    for (let i = 0; i < results.length; ++i) {
      response.push(results[i]._toJSON())
      response[i]._label = results[i]._getAdminLabel();
    }

    return this.sendJSON(response);
  }

  async getModelInstance(request, data={}) {

    let sectionIndex = parseInt(request.params.sectionIndex);
    let sections = Carolina.config('carolina_admin.sections', []);
    let modelIndex = parseInt(request.params.modelIndex);
    let Model = Carolina.$('DB')._modelClass(
      sections[sectionIndex].models[modelIndex]);
    let instance = await Model.$get({ _id: request.params.id });
  
    let response = instance._toJSON();
    response._label = instance._getAdminLabel();

    return this.sendJSON(response);
  }
  
  async newModelInstance(request, data={}) {
    
    let sectionIndex = parseInt(request.params.sectionIndex);
    let sections = Carolina.config('carolina_admin.sections', []);
    let modelIndex = parseInt(request.params.modelIndex);
    let Model = Carolina.$('DB')._modelClass(
      sections[sectionIndex].models[modelIndex]);
    let instance = new Model(request.data);
    
    try {
      await instance._save();
    }
    catch (e) {
      return this.sendJSON({
        success: false,
        fieldName: e.details.fieldName,
        message: e.details.message,
        value: e.details.value
      });
    }
    
    return this.sendJSON({
      success: true
    });
  }
  
  async updateModelInstance(request, data={}) {
    
    let sectionIndex = parseInt(request.params.sectionIndex);
    let sections = Carolina.config('carolina_admin.sections', []);
    let modelIndex = parseInt(request.params.modelIndex);
    let Model = Carolina.$('DB')._modelClass(
      sections[sectionIndex].models[modelIndex]);
    let instance = await Model.$get({ _id: request.params.id });
    
    instance._update(request.data, {
      enforceAdminEdit: true
    });
    try {
      await instance._save();
    }
    catch (e) {
      return this.sendJSON({
        success: false,
        fieldName: e.details.fieldName,
        message: e.details.message,
        value: e.details.value
      });
    }
    
    return this.sendJSON({
      success: true
    });
  }
  
  async deleteModelInstance(request, data={}) {
    
    let sectionIndex = parseInt(request.params.sectionIndex);
    let sections = Carolina.config('carolina_admin.sections', []);
    let modelIndex = parseInt(request.params.modelIndex);
    let Model = Carolina.$('DB')._modelClass(
      sections[sectionIndex].models[modelIndex]);
    let instance = await Model.$get({ _id: request.params.id });
    
    await instance._delete();
    
    return this.sendJSON({
      success: true
    });
  }
  
  async getAdminLink(request, data={}) {

    let modelName = request.data.model;
    let instanceId = request.data.id;
    let sections = Carolina.config('carolina_admin.sections', []);
    for (let i = 0; i < sections.length; ++i) {
      let sectionModels = sections[i].models || [];
      for (let j = 0; j < sectionModels.length; ++j) {
        if (sectionModels[j] == modelName) {
          
          let link = `/section/${i}/model/${j}/view/${instanceId}`;
          let Model = Carolina.$('DB')._modelClass(modelName);
          let instance = await Model.$get({ _id: instanceId });
          let instanceName = null;
          
          if (instance)  {
            instanceName = instance._getAdminLabel();
          }
          return this.sendJSON({ link: link, name: instanceName });
        }
      }
    }
    
    return this.sendJSON({});
  }
}

exports = module.exports = {
  'Carolina/Admin/AdminController': AdminController
};