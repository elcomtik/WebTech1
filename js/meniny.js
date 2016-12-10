/*http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript */
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10)
    dd='0'+dd

if(mm<10)
    mm='0'+mm

today = dd+'.'+mm+'.'+yyyy;
console.log(today);
var dnes = document.getElementById("dnes");
dnes.innerHTML = today;

function hladajDatum()
	{
	    var xmlDoc;
	    var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function()
	    {
	        if (this.readyState == 4 && this.status == 200)
	        {
	        najdiDatum(this);
	        }
	    }
	    xhttp.open("GET", "../data/meniny.xml", true);
	    xhttp.send();
	}

    function najdiDatum(xml)
    {
        xmlDoc = xml.responseXML;
        //document.getElementById("vysledok").innerHTML =
        //xmlDoc.getElementsByTagName("SK")[0].childNodes[0].nodeValue;
        var i = 0;
        var meno=document.getElementById("meno").value;
        meno = meno.toLowerCase();
        //console.log(meno)
        
        var mena = xmlDoc.getElementsByTagName("zaznam");
        for (var x = 0; x < mena.length; x++)
        {
            if(mena[x].getElementsByTagName("SK").length!==0)
            {
                var aaa = mena[x].getElementsByTagName("SK")[0].innerHTML;
                //console.log(aaa)
                var bbb = aaa.split(", ");
                for (var y = 0; y < bbb.length; y++)
                {
                    bbb[y] = bbb[y].toLowerCase()
                    if (meno==bbb[y]) {
                        var datum = mena[x].getElementsByTagName("den")[0].innerHTML;
                        document.getElementById("vysledok").innerHTML = datum.slice(2,4) + '.' + datum.slice(0,2) + '.';
                        return
                    }
                }   
            }
            i++;
        }
    	document.getElementById("vysledok").innerHTML = "zadané meno sa nenašlo";
	}

	function hladajMeno()
	{
	    var xmlDoc;
	    var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function()
	    {
	        if (this.readyState == 4 && this.status == 200)
	        {
	        najdiMeno(this);
	        }
	    }
	    xhttp.open("GET", "/data/meniny.xml", true);
	    xhttp.send();
	}

	    function najdiMeno(xml)
	    {
	        xmlDoc = xml.responseXML;
	        //document.getElementById("vysledok").innerHTML =
	        //xmlDoc.getElementsByTagName("SK")[0].childNodes[0].nodeValue;
	        var i = 0;
	        var datum=document.getElementById("datum").value;
	        //console.log(datum)
	        if (datum.length<4)
	        {
				document.getElementById("vysledok").innerHTML = "Dátum nie je zadaný v požadovanom formáte."
    			return;
	        }

	        var patt = new RegExp("^[0-3]?[0-9]?\.[0-9]?[0-9]?\.$");
    		var res = patt.test(datum);
    		if (res==false)
    		{
    			document.getElementById("vysledok").innerHTML = "Dátum nie je zadaný v požadovanom formáte."
    			return;
    		}

	        if (datum.length==6)//datum v tvare 12.04.
	        {
	        	if (datum[2]!='.' && datum[5]!='.')
	        	{
	        		document.getElementById("vysledok").innerHTML = "Dátum nie je zadaný v požadovanom formáte."
    				return;
	        	}
	            var mesiac = datum.slice(3,5);
	            var den = datum.slice(0,2);
	            if (den>31 || mesiac>12)
	            {
	            	document.getElementById("vysledok").innerHTML = "Dátum nie je zadaný v požadovanom formáte."
    				return;
	            }
	            //console.log(den);
	            //console.log(mesiac);
	            datum=mesiac+den;
	            //console.log(datum);
			}
	        else
	        {
		        if (datum.length==4) //datum v tvare 3.4.
		        {
		        	if (datum[1]!='.' && datum[3]!='.')
		        	{
		        		document.getElementById("vysledok").innerHTML = "Dátum nie je zadaný v požadovanom formáte."
	    				return;
		        	}
		            var date = [0,0,0,0];
		            date[0]=0;
		            date[1]=datum[2];
		            date[2]=0;
		            date[3]=datum[0];
		            datum = date.join('');
		            var mesiac = datum.slice(3,5);
		            var den = datum.slice(0,2);
		            if (den>31 || mesiac>12)
		            {
		            	document.getElementById("vysledok").innerHTML = "Dátum nie je zadaný v požadovanom formáte."
	    				return;
		            }
		            //console.log(datum);
		        }
		       
		        if (datum.length==5)
		        {
		            if (datum[1]=='.') //datum v tvare 1.05.
		            {
		            	if (datum[1]!='.' && datum[4]!='.')
			        	{
			        		document.getElementById("vysledok").innerHTML = "Dátum nie je zadaný v požadovanom formáte."
		    				return;
			        	}
		                var date = [0,0,0,0];
		                date[0]=datum[2];
		                date[1]=datum[3]
		                date[2]=0
		                date[3]=datum[0]
		                datum = date.join('');
		                var den = datum.slice(3,5);
			            var mesiac = datum.slice(0,2);
			            console.log(mesiac);
			            if (den>31 || mesiac>12)
			            {
			            	document.getElementById("vysledok").innerHTML = "Dátum nie je zadaný v požadovanom formáte."
		    				return;
			            }
		                //console.log(datum)
		            }
		            
			            if (datum[2]=='.') //datum v tvare 01.5.
			            {
			            	if (datum[2]!='.' && datum[4]!='.')
				        	{
				        		document.getElementById("vysledok").innerHTML = "Dátum nie je zadaný v požadovanom formáte."
			    				return;
				        	}
			                var date = [0,0,0,0];
			                date[0]=0;
			                date[1]=datum[3]
			                date[2]=datum[0]
			                date[3]=datum[1]
			                datum = date.join('');
			                var mesiac = datum.slice(3,5);
				            var den = datum.slice(0,2);
				            if (den>31 || mesiac>12)
				            {
				            	document.getElementById("vysledok").innerHTML = "Dátum nie je zadaný v požadovanom formáte."
			    				return;
				            }
			                //console.log(datum)
			            }
		            
		        }
	        }
		        
	        
	        
	        //console.log(meno)
	        
	        var vsetko = xmlDoc.getElementsByTagName("zaznam");
	        for (var x = 0; x < vsetko.length; x++)
	        {
	            if(vsetko[x].getElementsByTagName("SK").length!==0)
	            {
	                if(vsetko[x].getElementsByTagName("den")[0].innerHTML==datum)
	                {
	                    var datum = vsetko[x].getElementsByTagName("SK")[0].innerHTML;
	                    document.getElementById("vysledok").innerHTML = datum
	                    return
	                }
	            }
	            i++;
	        }
	        document.getElementById("vysledok").innerHTML = "v zadanom dátume nikto nemá meniny";
	}