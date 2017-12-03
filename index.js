var nameConnected = false;
var emailConnected = false;
var messageConnected = false;

function RedoNavBar() {
	if (window.innerWidth < 400) {
		document.getElementById("navH").innerHTML = "↑";
		document.getElementById("navR").innerHTML = "📷";
		document.getElementById("navA").innerHTML = "ℹ";
		document.getElementById("navC").innerHTML = "☎";
	} else {
		document.getElementById("navH").innerHTML = "A lap teteje";
		document.getElementById("navR").innerHTML = "Renderek";
		document.getElementById("navA").innerHTML = "Rólam";
		document.getElementById("navC").innerHTML = "Elérhetőség";
	}
}

window.onresize = RedoNavBar;

function LoadReady() {
	document.getElementById("nhiba").style.visibility = "hidden";
	document.getElementById("mhiba").style.visibility = "hidden";

	RedoNavBar();
}

$(document).ready(function () {
	$.getJSON('comments.json', { get_param: 'value' }, function(data) {
		$.each(data, function(index, element) {
			var kt = "<h3>" + element["nev"] + "</h3>";
			kt += "<i>" + element["email"] + "</i>";
			kt += "<p>" + element["uzenet"] + "</p>";
			kt += "<i>" + element["datum"] + "</i>";
			$("#kommentek").append('<div class="egykomment">' + kt)
		});
	});
});

function ValidateForm() {
	if (!nameConnected) {
		document.getElementById("nev").addEventListener("keyup",checkName);
		nameConnected = true;
	}
	
	if (!emailConnected) {
		document.getElementById("email").addEventListener("keyup",checkEmail);
		emailConnected = true;
	}
	
	/* 
	 * Az üzenetre nem teszünk megkötést, mert arra elég a HTML-es required.
	 */
	
	return (checkName() && checkEmail());
}

function checkName() {
	var name = document.getElementById("nev");
	var regex = /^[a-zA-Z]+$/;
	
	if (name.value[0] == name.value[0].toLowerCase() || !regex.test(name.value)) {
		document.getElementById("nhiba").style.visibility = "visible";
		return false;
	}
	
	document.getElementById("nhiba").style.visibility = "hidden";
	return true;
}

function checkEmail() {
	var email = document.getElementById("email");
	var regex = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
	
	if (regex.test(email.value) == false) {
		document.getElementById("mhiba").style.visibility = "visible";
		return false;
	}

	document.getElementById("mhiba").style.visibility = "hidden";
	return true;
}