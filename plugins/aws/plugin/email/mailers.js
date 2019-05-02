
/* global Carolina */

const BaseMailer = require('carolina/main/email/mailers/base-mailer');

class SESMailer extends BaseMailer {
  
  constructor(obj) {
    
    super(obj);
    
    const AWS = require('aws-sdk');
    
    let profile = obj.profile || Carolina.config("carolina_aws.profile", "default");
    let credentials = new AWS.SharedIniFileCredentials({ profile });
    let region = obj.region || Carolina.config("carolina_aws.region", "us-east-1");

    this.conn = new AWS.SES({ credentials, region });
  }
  
  async sendEmail(obj) {
    
    let Destination = { ToAddresses: obj.to };
    let Body = { Text: { Charset: "UTF-8", Data: obj.message } };
    let Subject = { Charset: "UTF-8", Data: obj.subject || "" };
    let Message = { Body, Subject };
    let Source = obj.from;
    
    return new Promise((resolve, reject) => {
      this.conn.sendEmail({
        Destination,
        Message,
        Source
      }, (err, data) => {
        if (err) reject(err);
        else {
          console.log(data);
          resolve();
        }
      });
    });
  }
}

exports = module.exports = {
  'Carolina/AWS/SESMailer': SESMailer
};