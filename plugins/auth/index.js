
const path = require('path');

this.pluginName = "Carolina Auth Plugin";
this.pluginPath = __dirname;

this.exportConfigFile = true;
this.exportStaticFiles = false;
this.exportTemplates = true;

this.outputConfigFile = 'carolina_auth.js';
this.outputConfigExportName = "carolina_auth";
this.outputStaticFilesDir = 'static/carolina/auth';
this.outputTemplatesDir = 'carolina/auth';

this.localConfigFile = path.resolve(__dirname, 'config', 'carolina_auth.js');
this.localStaticFilesDir = path.resolve(__dirname, 'static', 'carolina-auth');
this.localTemplatesDir = path.resolve(__dirname, 'templates');

this.requiredServices = {
  'Carolina/Auth': 'carolina/plugins/auth/plugin/service'
};