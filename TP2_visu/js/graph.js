$(document).ready(function() {


	//context.beginPath();
	function drawImage(idCanvas,tableaux)
	{
	    var canvas = document.getElementById("canvas");
	    var contexte = canvas.getContext("2d");
	    var h = canvas.height;
	    var w = canvas.width;
	    var coef = 50;

	    
	    var count = 0;
	    if(tableaux.length==undefined)
	    {
	    	count = Object.keys(tableaux).length;
	    }
	    else{
	    	count = tableaux.length;
	    }

	    contexte.beginPath();
	    contexte.moveTo( tableaux[0].x *coef, (h - tableaux[0].y*coef));
 		for(var i = 1; i < count; i++)
 		{
 			contexte.lineTo( tableaux[i].x *coef, (h - tableaux[i].y*coef));
 		}
 		contexte.stroke();
	}
	
	function displayCroc(idCanvas)
	{
		 $.get('../php/decomposition.php',function(data){
			var res = JSON.parse(data);
			drawImage(idCanvas,res['moyenne']);
			drawImage("canvasOrigin",res['origin']);

		});
	}

	

	displayCroc("canvas");
        

});
