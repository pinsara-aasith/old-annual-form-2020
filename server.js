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

http.createServer(function(req, res) {
    const fs = require('fs');
    const carbone = require('carbone');
    var url = require('url');
    let data = [];

    var q = url.parse(req.url, true);

    var pathname = q.pathname;
    var qdata = q.query;
    if (qdata.msg && qdata.msg == "retrive") {
        //Retrieve Command
        if (fs.existsSync('documents/' + qdata.name)) {

            res.writeHead(200, {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                "Access-Control-Allow-Origin": "*"
            });
            console.log("OK");
            fs.readFileSync('documents/' + qdata.name, function(err, data) {
                res.write(data);
                return res.end();
            });
        }else{
          return res.end("Not Found");
        }
    } else {

        req.on('data', chunk => {
            data.push(chunk)
        });
        req.on('end', () => {
            res.writeHead(200, {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                "Access-Control-Allow-Origin": "*"
            });
            try {
                var dat = JSON.parse(data);

                if (dat.user) {
                    carbone.render('./test.docx', dat, function(err, result) {
                        let filename = dat.user + Math.floor(Math.random() * 1000) + '.docx';
                        fs.writeFileSync('documents/' + filename , result);
                        let resJson = { name: (filename) };
                        return res.end(JSON.stringify(resJson));
                    });
                } else {

                }

                //    if (err) {
                //      return console.log(err);
                //    }
                //    // write the result


                //  });

            } catch (e) {
                fs.readFile('./test.docx', function(err, data) {
                    res.write(data);
                    return res.end();
                });
            }
        });

    }

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