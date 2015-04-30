jQuery(function($) {
	$('.list-group-item').on('click', function() {
		var name = $(this).text();
		var email = name+'@gmail.com';
		$('h2').text(name);
		$('#email').text(email);

		$('.list-group-item').removeClass('active');
		$(this).addClass('active');
		
	})
});

