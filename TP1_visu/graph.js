
$(document).ready(function() {
	function requestDecompose()
	{
		 $.get('deconstruction.php?res=1',function(data){
		 		var res = JSON.parse(data);
	            $('#tabOrigine').text(res['origin']);
	            $('#tabDecomp').text(res['decompo']);
	     });
	}

	requestDecompose();
});