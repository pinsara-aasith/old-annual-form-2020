	var xmlhttp;
function loadXMLDoc(cfunc)
{
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=cfunc;
xmlhttp.open("POST","http://detailprinter.cloudno.de",true);

var data = {
  firstname : 'Pinsra',
  lastname : 'Aasith'
};
xmlhttp.send(JSON.stringify(data));
}


async function renderReportAndGetRenderId() 
{
loadXMLDoc(function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
		 var a = document.createElement('a');
            var url = window.URL.createObjectURL(xmlhttp.response);
            a.href = url;
            a.download = 'download.pdf';
            document.body.append(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
			
    }
  });
}

