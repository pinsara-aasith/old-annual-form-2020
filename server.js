const fs = require('fs');
const carbone = require('carbone');

// Data to inject
var data = {
  firstname : 'John',
  lastname : 'Doe'
};
var options = {
	convertTo : 'pdf',
	lang: 'en-us',  
};

// Generate a report using the sample template provided by carbone module
// This LibreOffice template contains "Hello {d.firstname} {d.lastname} !"
// Of course, you can create your own templates!
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  const fs = require('fs');
  const carbone = require('carbone');

  // Data to inject
  var data = {
    firstname : 'John',
    lastname : 'Doe'
  };

  // Generate a report using the sample template provided by carbone module
  // This LibreOffice template contains "Hello {d.firstname} {d.lastname} !"
  // Of course, you can create your own templates!
  carbone.render('./node_modules/carbone/examples/test.docx', data, function(err, result){
    if (err) {
      return console.log(err);
    }
    // write the result
    fs.writeFileSync('name.docx', result);
    
  });

  res.end('Hello World!');
}).listen(80);

