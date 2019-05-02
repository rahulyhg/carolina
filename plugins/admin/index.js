
const path = require('path');

this.pluginName = "Carolina Admin Plugin";
this.pluginPath = __dirname;

this.exportConfigFile = true;
this.exportPrivateFiles = false;
this.exportSrcFiles = true;
this.exportStaticFiles = false;
this.exportTemplates = true;

this.outputConfigFile = 'carolina_admin.js';
this.outputConfigExportName = "carolina_admin";
this.outputPrivateFilesDir = 'carolina/admin';
this.outputSrcFilesDir = 'carolina/admin';
this.outputStaticFilesDir = 'static/carolina/admin';
this.outputTemplatesDir = 'carolina/admin';

this.localConfigFile = path.resolve(__dirname, 'config', 'carolina_admin.js');
this.localPrivateFilesDir = path.resolve(__dirname, 'private');
this.localSrcFilesDir = path.resolve(__dirname, 'src');
this.localStaticFilesDir = path.resolve(__dirname, 'static', 'carolina-admin');
this.localTemplatesDir = path.resolve(__dirname, 'templates');

this.requiredServices = {
  'Carolina/Admin': 'carolina/plugins/admin/plugin/service'
};