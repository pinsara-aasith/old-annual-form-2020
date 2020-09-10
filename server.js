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
var http = require('http');

http.createServer(function (req, res) {
  const fs = require('fs');
  const carbone = require('carbone');

  // Data to inject
  // var data = {
    // firstname : 'John',
    // lastname : 'Doe'
  // };
	let data = []
  req.on('data', chunk => {
    data.push(chunk)
  })
  req.on('end', () => {
    var dat = JSON.parse(data);
	carbone.render('./test.docx', dat, function(err, result){
    if (err) {
      return console.log(err);
    }
    // write the result
    fs.writeFileSync('name.docx', result);
	
	res.writeHead(200, {'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	"Access-Control-Allow-Origin":"*"});
    res.write(result);
    return res.end();
    
  });
	
  })
  // Generate a report using the sample template provided by carbone module
  // This LibreOffice template contains "Hello {d.firstname} {d.lastname} !"
  // Of course, you can create your own templates!
  
}).listen(80);

