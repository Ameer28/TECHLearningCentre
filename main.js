//Responsive Nav

$(function () {
	menu = $('nav ul');

	$('#openup').on('click', function (e) {
		e.preventDefault();
		menu.slideToggle();
	});

	$(window).resize(function () {
		var w = $(this).width();
		if (w > 480 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});

	$('nav li').on('click', function (e) {
		var w = $(window).width();
		if (w < 480) {
			menu.slideToggle();
		}
	});
	$('.open-menu').height($(window).height());
});

var default_content = "";

$(document).ready(function () {

	checkURL();
	$('ul li a').click(function (e) {
		checkURL(this.hash);
	});

	//filling in the default content
	default_content = $('#pageContent').html();


	setInterval("checkURL()", 250);

});

var lasturl = "";

function checkURL(hash) {
	if (!hash) hash = window.location.hash;

	if (hash != lasturl) {
		lasturl = hash;
		// FIX - if we've used the history buttons to return to the homepage,
		// fill the pageContent with the default_content
		if (hash == "")
			$('#pageContent').html(default_content);

		else {
			if (hash == "#products")
				loadProducts();
			else
				loadPage(hash);
		}
	}
}

function loadPage(url) {
	url = url.replace('#page', '');

	$('#loading').css('visibility', 'visible');

	$.ajax({
		type: "POST",
		url: "load_page.jsp",
		data: 'page=' + url,
		dataType: "html",
		success: function (msg) {

			if (parseInt(msg) != 0) {
				$('#section-container').html(msg);
				$('#loading').css('visibility', 'hidden');
			}
		}

	});

}

function dropDown() {
	var x = document.getElementById("coursesnav");
	if (x.className === "topNav") {
		x.className += "responsive";
	} else {
		x.className = "topNav";
	}
}