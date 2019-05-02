
const fs = require('fs-extra');
const path = require('path');

const BaseCommand = require('carolina/main/terminal/commands/base-command');

class ImportPluginResourcesCommand extends BaseCommand {
  
  constructor() {
    
    super();
    
    this.commandName = "import-plugin-resources";
    this.description = "Copies static and template files from the given plugin(s) into your project.";
    this.args = [
      {
        arg: ['-a', '--all'],
        options: {
          action: 'storeTrue',
          help: "Do all the plugins."
        }
      },
      {
        arg: ['-p', '--plugin'],
        options: {
          help: "Do the named plugin only (overwritten by -a)."
        }
      },
      {
        arg: ['-c', '--config'],
        options: {
          action: 'storeTrue',
          help: "Copy config file."
        }
      },
      {
        arg: ['-r', '--src'],
        options: {
          action: 'storeTrue',
          help: "Copy src files."
        }
      },
      {
        arg: ['-s', '--static'],
        options: {
          action: 'storeTrue',
          help: "Copy static files."
        }
      },
      {
        arg: ['-t', '--templates'],
        options: {
          action: 'storeTrue',
          help: "Copy template files."
        }
      },
      {
        arg: ['-f', '--files'],
        options: {
          action: 'storeTrue',
          help: "Copy private files."
        }
      }
    ];
  }
  
  async handle(args) {
    
    /* global Carolina */
    
    // console.log(args);

    let exportConfig = args.config;
    let exportPrivateFiles = args.files;
    let exportSrc = args.src;
    let exportStatic = args.static;
    let exportTemplates = args.templates;

    let pluginList = [];
    let installedPluginsList = Carolina.config('app.plugins');

    if (!args.all) {
      if (installedPluginsList.indexOf(args.plugin) == -1) {
        this.err("That plugin is not installed. Add it to config/app.js -> plugins");
      }
      else {
        pluginList.push(args.plugin);
      }
    }
    else {
      pluginList = installedPluginsList;
    }

    for (let i = 0; i < pluginList.length; ++i) {
      
      let plugin = require(pluginList[i]);

      if (exportConfig && plugin.exportConfigFile) {
        fs.copySync(plugin.localConfigFile, path.resolve(Carolina.appPath,
          'config', plugin.outputConfigFile));

        let msg = `You will need ensure that config/${plugin.outputConfigFile} is exported in config/index.js as "${plugin.outputConfigExportName}".`;
        this.info(msg);
      }
      if (exportPrivateFiles && plugin.exportPrivateFiles) {
        console.log(`Copying private files from ${plugin.localPrivateFilesDir} to ${path.resolve(Carolina.appPath,
          'storage', plugin.outputPrivateFilesDir)}`);
        fs.copySync(plugin.localPrivateFilesDir, path.resolve(Carolina.appPath,
          'storage', plugin.outputPrivateFilesDir));
      }
      if (exportSrc && plugin.exportSrcFiles) {
        console.log(`Copying src files from ${plugin.localSrcFilesDir} to ${path.resolve(Carolina.appPath,
          'src', plugin.outputSrcFilesDir)}`);
        fs.copySync(plugin.localSrcFilesDir, path.resolve(Carolina.appPath,
          'src', plugin.outputSrcFilesDir));
      }
      if (exportStatic && plugin.exportStaticFiles) {
        fs.copySync(plugin.localStaticFilesDir, path.resolve(Carolina.appPath,
          'public', plugin.outputStaticFilesDir));
      }
      if (exportTemplates && plugin.exportTemplates) {
        fs.copySync(plugin.localTemplatesDir, path.resolve(Carolina.appPath,
          'templates', plugin.outputTemplatesDir));
      }
      
    }

    return 0;
  }
}

exports = module.exports = ImportPluginResourcesCommand;