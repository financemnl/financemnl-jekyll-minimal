var request = require('request');
var path = require( 'path' );
var criticalcss = require("criticalcss");
var fs = require('fs');
var tmpDir = require('os').tmpdir();

var cssUrl = 'https://financemnl.com/assets/css/main.css';
var cssPath = path.join( tmpDir, 'main.css' );
request(cssUrl).pipe(fs.createWriteStream(cssPath)).on('close', function() {
  criticalcss.getRules(cssPath, function(err, output) {
    if (err) {
      throw new Error(err);
    } else {
      criticalcss.findCritical("https://financemnl.com/", { rules: JSON.parse(output) }, function(err, output) {
        if (err) {
          throw new Error(err);
        } else {
          console.log(output);
        }
      });
    }
  });
});