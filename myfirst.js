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
      var val = {
          firstname: 'Hesandi',
          lastname: 'Mallawarachchi'
      };

      loadXMLDoc(function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              var req = JSON.parse(xmlhttp.response);
              var url;
              if (req.name) {
                  var url = "https://detailprinter.cloudno.de?msg=retrive&name=" + encodeURIComponent(req.name);
                  var a = document.createElement('a');
                  a.href = url;
                  a.download = "printed document of " + req.name;
                  document.body.append(a);
                  a.click();
                  a.remove();
                  window.URL.revokeObjectURL(url);
              }
          }
      });
  }