$(document).ready(function() {


	//context.beginPath();
	function drawImage(idCanvas,tableaux)
	{
	    var canvas = document.getElementById("canvas");
	    var contexte = canvas.getContext("2d");
	    var h = canvas.height;
	    var w = canvas.width;
	    var coef = 50;

	    contexte.beginPath();
 		for(var i = 0; i < tableaux.length; i++)
 		{
 			contexte.lineTo( tableaux[i].x *coef, (h - tableaux[i].y*coef));
 		}
 		contexte.stroke();
	}
	
	function displayCroc(idCanvas)
	{
		 $.get('decomposition.php',function(data){
			var res = JSON.parse(data);
			drawImage(idCanvas,res['Moyenne'])
		});
	}

	displayCroc("canvas");
        

});
