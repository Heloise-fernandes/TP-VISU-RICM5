$(document).ready(function() {

	function requesterreurs()
	{
		var detail = 1;
		for (var i =0; i <= 10; i++){
			detail = detail / 10;
			$.get('deconstruction.php?file=fichierSinus.txt&NIvDetail=detail',function(data){
				var resdec = JSON.parse(data);
				$.get('reconstruction.php?decompo=resdec[\'decompo\']', function(data){
					var resrec = JSON.parse(data);
					$.get('erreur.php?recompo=resrec[\'recompo\']&origin=resdec[\'origin\']',function(data){
						var err = JSON.parse(data);
						nivDetail[i] = detail;
						erreurs[i] = err['erreur_quadra'];
					});
				});
			});

			var trace = {
				x: nivDetail,
				y: erreurs[i],
				name:'Détail supérieur à '+detail,
				type:'scatter'
			};
			Plotly.addTraces(ErreursDetail,trace);
		};
	};

	ErreursDetail = document.getElementById('ErreursDetail');

	Plotly.newPlot('ErreursDetail', []);

	requesterreurs();
});