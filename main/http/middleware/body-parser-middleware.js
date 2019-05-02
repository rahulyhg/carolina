
/* global Carolina */

const fs = require('fs-extra');
const path = require('path');

const parseMultipart = require('parse-multipart');
const queryString = require('query-string');

const generateId = require('carolina/_lib/generate-id');
const BaseMiddleware = require('carolina/main/http/middleware/base-middleware');

class BodyParserMiddleware extends BaseMiddleware {
  async before(request, data) {
    
    if (request.headers.hasOwnProperty('content-type')) {
      if (request.headers["content-type"] == "application/x-www-form-urlencoded") {
        let data = queryString.parse(request.body.toString());
        for (let keyName in data) {
          request.data[keyName] = data[keyName];
        }
      }
      else if (request.headers["content-type"] == "application/json") {

      }
      else if (request.headers["content-type"].startsWith("multipart/form-data")) {
        
        let boundaryIndex = request.headers["content-type"].indexOf("boundary=");
        let boundary = request.headers["content-type"].slice(boundaryIndex + "boundary=".length);
        // let bodyParts = request.body.toString().split(boundary);

        // console.log(request._req.body.upload);
        
        request.data = request._req.body;
        
        /**
        console.log(boundary);
        
        let data = {};
        
        for (let i = 0; i < bodyParts.length; ++i) {
          
          let part = bodyParts[i];
          let lines = part.split(/\r\n/);
          
          if (lines.length > 2) {
            
            let isFile = false;
            let filename = null;
            
            let part2 = lines[1].split("Content-Disposition: form-data; name=\"")[1];
            if (part2.indexOf("filename=\"") != -1) {
              
              let part3 = part2.split("filename=\"")[1];
              part2 = part2.split(";")[0];
              
              filename = part3.slice(0, part3.length - 1);
              
              isFile = true;
            }
            
            let key = part2.slice(0, part2.length - 1);
            console.log(key);
            
            let value = null;
            
            if (!isFile) {
            
              let valueLines = lines.slice(3, lines.length - 1);
              console.log(valueLines.length);
              value = valueLines.join('\n');
              // console.log(value);
            }
            else {
              let valueLines = lines.slice(4, lines.length - 1);
              value = valueLines.join('\r\n');
              value = new Buffer(value);
              value = value.slice(2);
            }
            
            
            if (isFile) {
              let tempFilePath = `/${generateId()}/${filename}`;
              await Carolina.$("Files").drives["temp"].writeFile(tempFilePath, value);
            }
            else {
              data[key] = value;
            }
          }
          
        }*/
      }
    }
    
    // console.log(request.data);
    
    return request;
  }
}

exports = module.exports = BodyParserMiddleware;