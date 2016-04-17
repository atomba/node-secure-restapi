var jwtTool = require('njwt'),
    fs = require('fs');

var claimsJSON = fs.readFileSync(__dirname + '/../config/claims.json', 'utf8');
var secretJSON = fs.readFileSync(__dirname + '/../config/secret.json', 'utf8');
var secret = JSON.parse(secretJSON).secretKey;
var claims = JSON.parse(claimsJSON);

var jwt = jwtTool.create(claims, secret);

console.log(claimsJSON);
console.log("key: " + secret);
console.log("jwt:");
console.log(jwt);
console.log();
console.log(jwt.compact());