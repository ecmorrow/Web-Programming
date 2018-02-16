$(document).ready(function() {
	var i = 1;
	var dogs;
	
	var myurl= "https://api.rescuegroups.org/rest/?key=8oqHMgcE&type=animals&limit=20";
	$.ajax({
		type:"GET",
	    url : myurl,
	    dataType : "xml",
	    success : function(xml) {
	    	showPage();
			dogs = xml.getElementsByTagName("pet");
			console.log(dogs);
	    	showDog(dogs[1]);
    	}
	});





	function showPage() {
	  document.getElementById("loader").style.display = "none";
	  document.getElementById("myDiv").style.display = "block";
	}

	var showDog = function(dog) {
		console.log("hey")
		document.getElementById("name").innerHTML = dog.getElementsByTagName("name")[0].childNodes[0].nodeValue
			+", " + "<span class=\"age\">" + dog.getElementsByTagName("age")[0].childNodes[0].nodeValue + "</span>";
		var img = dog.getElementsByTagName("pic1")[0].childNodes[0].nodeValue;
		$("#image").attr("src", img);

		console.log(dog.getElementsByTagName("pic1")[0].childNodes[0].nodeValue);

	}

	function nextItem() {
		i = i + 1;
		if (i > 19) i = 1;
		showDog(dogs[i]);
	}

	var like = document.getElementById("like");
	var dislike = document.getElementById("dislike");

	dislike.style.cursor = 'pointer';
	like.style.cursor = 'pointer';

	// dislike.onclclick
	// like.onclick = nextItem;

	$("#like").click(function() {
		nextItem();
	})

	$("#dislike").click(function() {
		$("#photo").effect("shake",300);
	})


	
	

});