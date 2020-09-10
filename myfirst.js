// const fs = require('fs');
// const carbone = require('carbone');

// var http = require('http');

// http.createServer(function (req, res) {


// var data = {
//     firstname : 'John',
//     lastname : 'Doe'
//   };

//   var options = {
//     convertTo : 'pdf' //can be docx, txt, ...
//   };

//   carbone.render('./node_modules/carbone/examples/simple.odt', data, options, function(err, result){
//     if (err) {return console.log(err);res.end();}
//     fs.writeFileSync('result.pdf', result);
//     process.exit(); // to kill automatically LibreOffice workers
//   });

// }).listen(80);

async function renderReportAndGetRenderId() {
  const templateId = '5d5f9feb673ef41a9c3a70ae474ded9c49d752384b8604775fdc0d2ab6c07aa4'; // special template id for demo purpose
  const resp = await fetch(`https://render.carbone.io/render/${templateId}`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type'    : 'application/json',
      'Carbone-Version' : '2',
      'Authorization': 'test_eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIzMTE1IiwiYXVkIjoiY2FyYm9uZSIsImV4cCI6MjIyOTk3NDQyNywiZGF0YSI6eyJpZEFjY291bnQiOjMxMTV9fQ.AMOYfnrlx2HHRm0cGuQg6GGQixsRhaKqfLyE1L0Eo90MkbTBc3JTVrtP5xxakyl9ILxhIDZJwv3TO6c0yVXGzdCTATr02wT2wmXVd5Kps5nhW58iWRjVk_AhXWoyKZa2joxsAaFueLcabk167JnAWG21SdJt-sL_5Ecn9X4a2O5-d0bz'
    }),
    body: JSON.stringify({
      convertTo: 'pdf', // Convert the template to another file format
      data: {           // Update the data below and click on 'Render'
        id       : 42,
        date     : 1492012745,
        company  : { name: 'myCompany' , address: 'here' , city: 'Notfar' , postalCode: 123456 },
        customer : { name: 'myCustomer', address: 'there', city: 'Faraway', postalCode: 654321 },
        products : [ {name: 'product 1' , priceUnit: 0.1, quantity: 10, priceTotal: 1 } ],
        total    : 140
      }
    })
  }).then(res => res.json());
  if (resp && resp.success === true && resp.data && resp.data.renderId) {
    // Get the result with a simple HTTP GET 
    return (`https://render.carbone.io/render/${resp.data.renderId}`);
  } else if (resp && resp.error) {
    return (resp.error);
  }
}

renderReportAndGetRenderId();