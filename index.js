
let redis = require('redis');

async function main() {
  
  let client = redis.createClient({
    // test
  });
  
  // console.log(client);
  
  client.on("error", function (err) {
    console.log("Error " + err);
  });
  
  // client.set("string key", "string value", (x, y) => { console.log(x, y); } );
  client.keys("*", (x, y) => { console.log(x, y); } );
  
  console.log("end");
}

main();