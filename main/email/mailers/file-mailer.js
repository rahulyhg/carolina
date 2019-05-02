
/* global Carolina */

const fs = require('fs-extra');
const path = require('path');

const moment = require('moment');
const yaml = require('yamljs');

const BaseMailer = require('carolina/main/email/mailers/base-mailer');

class FileMailer extends BaseMailer {
  
  constructor(obj) {
    super(obj);
    this.basepath = obj.basepath || path.resolve(process.cwd(), '.tmp', 'mail');
  }
  
  async sendEmail(obj) {
    
    fs.ensureDirSync(this.basepath);
    
    let timestamp = moment().format();
    
    let metadata = {};
    metadata.FROM = obj.from;
    metadata.TO = obj.to;
    metadata.CC = obj.cc || undefined;
    metadata.BCC = obj.bcc || undefined;
    metadata.SUBJECT = obj.subject || "NO SUBJECT";
    metadata.TIME = timestamp;
    
    fs.writeFileSync(path.resolve(this.basepath, `${timestamp}.yml`),
      yaml.stringify(metadata));
    
    if (obj.isHtml) {
      fs.writeFileSync(path.resolve(this.basepath, `${timestamp}.html`),
        obj.message);
    }
    else {
      fs.writeFileSync(path.resolve(this.basepath, `${timestamp}.txt`),
        obj.message);
    }
  }
}

exports = module.exports = FileMailer;