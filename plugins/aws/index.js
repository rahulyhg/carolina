
const path = require('path');

this.pluginName = 'Carolina AWS Plugin';
this.pluginPath = __dirname;

this.exportConfigFile = true;
this.exportStaticFiles = false;
this.exportTemplates = false;

this.outputConfigFile = 'carolina_aws.js';
this.outputConfigExportName = "carolina_aws";

this.localConfigFile = path.resolve(__dirname, 'config', 'carolina_aws.js');