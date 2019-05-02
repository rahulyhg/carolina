/**
 * Publishes site to S3 bucket.
 */

require('dotenv').config();

var AWS = require('aws-sdk');
var fs = require('fs-extra');
var mime = require('mime-types');

var walk = require('carolina/_lib/walk');

async function putS3File(params, S3) {
  return new Promise(function(resolve, reject) {
    S3.putObject(params, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    })
  })
}

async function publish(args) {
  
  let credentials = new AWS.SharedIniFileCredentials({profile: 'default' });
  var S3 = new AWS.S3({ credentials });

  let bucketName = "carolina-site";
  
  await Promise.all([
    // first copy home files
    walk('vuepress_site/.vuepress/dist').map(function(fpath) {

      var mType = mime.lookup(fpath);
      if (!mType) mType = 'application/octet-stream';

      var key = fpath.split('vuepress_site/.vuepress/dist/')[1];
      var params = {
        ACL: 'public-read',
        Body: fs.readFileSync(fpath),
        Bucket: bucketName,
        ContentType: mType,
        Key: key
      };

      console.log(`Placing file in S3 Bucket: ${params.Key}`);
      return putS3File(params, S3);
    })
  ]);
}

publish();