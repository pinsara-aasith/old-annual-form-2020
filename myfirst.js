  var xmlhttp;

  function loadXMLDoc(cfunc) {
      if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
          xmlhttp = new XMLHttpRequest();
      } else { // code for IE6, IE5
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlhttp.onreadystatechange = cfunc;
      xmlhttp.open("POST", "http://detailprinter.cloudno.de", true);

      var data = {
          user: "pinsara",
          firstname: 'Hesandi',
          lastname: 'Aasith'
      };
      xmlhttp.send(JSON.stringify(data));
  }



  function renderReportAndGetRenderId() {
      alert("ok");
      var val = {
          firstname: 'Hesandi',
          lastname: 'Mallawarachchi'
      };

      loadXMLDoc(function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              var blob = new Blob([xmlhttp.response], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
              var url = window.URL.createObjectURL(blob);
              var a = document.createElement('a');
              alert(xmlhttp.response);
              a.href = url;
              a.download = 'downloaeed.docx';
              document.body.append(a);
              a.click();
              a.remove();
              window.URL.revokeObjectURL(url);

          }
      });
  }

  function renderReportAndGetRenderId() {
      alert("ok");
      var val = {
          firstname: 'Hesandi',
          lastname: 'Mallawarachchi'
      };

      loadXMLDoc(function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              // var blob = new Blob([xmlhttp.response], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
              // var url = window.URL.createObjectURL(blob);
              // var a = document.createElement('a');
              // alert(xmlhttp.response);
              // a.href = url;
              // a.download = 'downloaeed.docx';
              // document.body.append(a);
              // a.click();
              // a.remove();
              // window.URL.revokeObjectURL(url);
              var req = JSON.parse(xmlhttp.response);
              if(req.name){
                window.open("https://detailprinter.cloudno.de?msg=retrive&&name=" + req.name, "_blank"); 
              }
          }
      });
  }