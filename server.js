var http = require('http');

http.createServer(function(req, res) {
    const fs = require('fs');
    const carbone = require('carbone');
    const path = require('path');

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
            fs.readFile('documents/' + qdata.name, function(err, data) {
                res.write(data);
                return res.end();
            });
        } else {
            return res.end("Not Found");
        }
    } else if (qdata.msg == "clean") {

        const directory = 'documents';

        fs.readdir(directory, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                });
            }
        });
        return res.end();

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
                    carbone.render('./application_format.docx', dat, function(err, result) {
                        let filename = dat.user + Math.floor(Math.random() * 1000) + '.docx';
                        fs.writeFileSync('documents/' + filename, result);
                        let resJson = { name: (filename) };
                        return res.end(JSON.stringify(resJson));
                    });
                } else {

                }
            } catch (e) {
                res.end("Error Parsing JSON Message...");
            }
        });

    }


}).listen(80);