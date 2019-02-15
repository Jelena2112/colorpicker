$(document).ready(function() {
	//$("._opacityRange").val(1);
	 var colorRed = 127;
	 var colorGreen = 127;
	 var colorBlue = 127;
	 var opacity = 1;

	$("._colorRange").on("input", function() {

		colorRed = $("._red").val();
		colorGreen = $("._green").val();
		colorBlue = $("._blue").val();
		opacity = $("._opacity").val();
		
		$("body").css({
			"background":"rgba("+colorRed+","+colorGreen+","+colorBlue+","+opacity+")"
		});

		$(".currentColor").html("rgba("+colorRed+","+colorGreen+","+colorBlue+","+opacity+")");
	});

	$(".saveButton").click(function() {
		$(".saveButton").css({
			"font-size":"21px",
			"background-color":"rgb(128,105,128)",
		});
		$(".colorHistory").prepend("<div class='eachHistory'></div>");
		$(".eachHistory:first").css({
			"background":"rgba("+colorRed+","+colorGreen+","+colorBlue+","+opacity+")"
		}).html(colorRed+","+colorGreen+","+colorBlue+","+opacity).css({"font-size":"22px"});


		$.ajax({
			url:"skripta.php",
			method:"POST",
			data: {red:colorRed, green:colorGreen, blue:colorBlue, opacity:opacity, method:"saveColor"},
			success: function(result) {
				console.log(result);
			}
		});

	});
	$(".saveButton").mouseleave(function() {
		$(".saveButton").css({
			"font-size":"23px",
			"background-color":"buttonface"
		});
	});


	// #1 
	// za cuvanje boja koristiti API endpoint
	// url je skripta.php
	// Metoda: POST
	// parametri: red, green, blue, method (vrednost je "saveColor")


	// #2
	// za uzimanje boja iz baze 
	// za cuvanje boja koristiti API endpoint
	// url je skripta.php
	// Metoda: POST
	// parametri: method (vrednost je "getColors")
	// optional param: limit = broj rezultata. Default je 100
	// Api endpoint vraca JSON objekat (Vazno)
	$.ajax({
		url:"skripta.php",
		method:"POST",
		dataType:"JSON",
		data:{method:"getColors"},
		success:function(rezultat){
			for(x in rezultat["results"]){
				//console.log(rezultat["results"][x]["red"]);
				$(".colorHistory").prepend("<div class='eachHistory'></div>");
				$(".eachHistory:first").css({
					"background":"rgba("+rezultat["results"][x]["red"]+","+rezultat["results"][x]["green"]+","+rezultat["results"][x]["blue"]+","+rezultat["results"][x]["opacity"]+")"
				}).html(rezultat["results"][x]["red"]+","+rezultat["results"][x]["green"]+","+rezultat["results"][x]["blue"]+","+rezultat["results"][x]["opacity"]);

			}
		}
	});
});