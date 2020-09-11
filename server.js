// const fs = require('fs');
// const carbone = require('carbone');

// Data to inject
// var data = {
//   firstname : 'John',
//   lastname : 'Doe'
// };
// Generate a report using the sample template provided by carbone module
// This LibreOffice template contains "Hello {d.firstname} {d.lastname} !"
// Of course, you can create your own templates!
var http = require('http');

http.createServer(function (req, res) {
  const fs = require('fs');
  const carbone = require('carbone');

	let data = [];
  req.on('data', chunk => {
    data.push(chunk)
  });
  req.on('end', () => {
    res.writeHead(200, {'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    "Access-Control-Allow-Origin":"*"});
      try{
        var dat = JSON.parse(data);
        carbone.render('./test.docx', dat, function(err, result){
          fs.writeFile('name.docx', result);
          fs.readFile('name.docx', function(err, data) {
             res.write(data);
          });
        });
 //    if (err) {
 //      return console.log(err);
 //    }
 //    // write the result
  
    
 //  });
    
    }catch(e){
      return res.end("ok i am bad");
    }
  });


	  
	 // return res.end("ok i am bad");
	//   try{
 //    var dat = JSON.parse(data);
	
 //    fs.writeFile('name.docx', result);
	
 //    fs.readFile('name.docx', function(err, data) {
 //    res.writeHead(200, {'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
 //    res.write(data);
	
 //    return res.end();
	//   }catch(e){
		  
	  
	//   fs.readFile('name.docx', function(err, data) {
 //    res.writeHead(200, {'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
 //    res.write(data);
 //    return res.end();
 //  });
	//   }
	// carbone.render('./test.docx', dat, function(err, result){
 //    if (err) {
 //      return console.log(err);
 //    }
 //    // write the result
	
    
 //  });
	
 //  })
}).listen(80);

