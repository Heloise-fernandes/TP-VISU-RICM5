$(document).ready(function() {


	//context.beginPath();
	function drawImage(idCanvas,tableaux,coef)
	{
	    var canvas = document.getElementById(idCanvas);
	    var contexte = canvas.getContext("2d");
	    var h = canvas.height;
	    var w = canvas.width;
	    //var coef = 20;

	    
	    var count = tableaux.length;

	    contexte.beginPath();
	    contexte.moveTo( (w/2 -tableaux[0].x *coef), (h/2 - tableaux[0].y*coef));
 		for(var i = 1; i < count; i++)
 		{
 			contexte.lineTo( (w/2 -tableaux[i].x *coef), (h/2 - tableaux[i].y*coef));
 		}
 		contexte.lineTo( (w/2 -tableaux[0].x *coef), (h/2 - tableaux[0].y*coef));
 		contexte.stroke();
	}
	
	function displayCroc()
	{
		 $.get('../php/decomposition.php?file=../sources_files/crocodile512.d',function(data){
			var res = JSON.parse(data);
			
			drawImage("canvas",res['moyenne'],20);
			drawImage("canvasOrigin",res['origin'],25);

		});
	}

	

	displayCroc();
        

});
