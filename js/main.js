// var CONTACTS = [
// {
// 	name: 'Oleksandr Tsukur',
// 	email: 'tsuros@gmail.com',
// 	address: '123 Main str, apt. 34, Springfield, CA 94905',
// 	mobile: 12431243
// },{
// 	name: 'Oleksandr Zadorozhko',
// 	email: '',
// 	address: '',
// 	mobile: 12431243
// },{
// 	name: 'Uncle Sasha',
// 	email: '',
// 	address: '',
// 	mobile: 12431243
// }
// ];


jQuery(function($) {
	var contact_form = $('#contact-form'),
		contact_info = $('#contact-info'),
		contact_name_input = $('#contact-name'),
		contact_address_input = $('#contact-address'),
		contact_email_input = $('#contact-email'),
		contact_mobile_input = $('#contact-mobile'),
		contact_form_group_input = $('#contact-form-group-select'),
		contact_list = $('.list-group-item');
		

	// selects contact on click
	$('.list-group').on('click', '.list-group-item', function() {
		// console.log(this);
		var name = $(this).text();
		var contact_object = $(this).data();
		// var address = $(this).data('address');
		// var mobile Valentina= $(this).data('mobile');

		$('h2').text(name);
		$('#email').text(contact_object.email);
		$('#adress').text('Adress: '+ contact_object.address);
		$('#mobile').text('Mobile: '+ contact_object.mobile);

		$('.list-group-item').removeClass('active');
		$(this).addClass('active');
		contact_form.addClass('hidden');
		contact_info.removeClass('hidden');
	});
	// deletes selected contact
	$('#button-delete').on('click',function() 
	{
		$('.active').remove();
		$('.list-group-item').first().click();
		if ($('.list-group-item').length == 0 ) 
		{
			$('.my-adress').empty()
				.html('<h1 class="text-center">No contacts</h1>')

		};
	});
	// Show form for adding new contact
	$('#add-contact').on('click',function()
	{
		contact_name_input.val('');
		contact_address_input.val('');
		contact_email_input.val('');
		contact_mobile_input.val('');

		contact_form.removeClass('hidden');
		contact_info.addClass('hidden');
		$('#button-save').removeClass('hidden');
		$('#button-update').addClass('hidden');

	});
	// Register new contact to CB
	$('#button-save').on('click', function()
	{
		var name = contact_name_input.val(),
			address = contact_address_input.val(),
			email = contact_email_input.val(),
			mobile = contact_mobile_input.val(),
			group = contact_form_group_input.val();
			// console.log(name, address, email, mobile);
		if ( name.length === 0 ) {
			console.error('Please fill name field');
			contact_name_input.parent().addClass('has-error');
			return;
		}
		else {
			contact_name_input.parent().removeClass('has-error');
		}

		if ( address.length === 0 ) {
			console.error('Please fill email field');
			contact_address_input.parent().addClass('has-error');
			return;
		}
		else {
			contact_address_input.parent().removeClass('has-error');
		}
		if ( email.length === 0 ) {
			console.error('Please fill email field');
			contact_email_input.parent().addClass('has-error');
			return;
		}
		else {
			contact_email_input.parent().removeClass('has-error');
		}
		if ( mobile.length === 0 ) {
			console.error('Please fill email field');
			contact_mobile_input.parent().addClass('has-error');
			return;
		}
		else {
			contact_mobile_input.parent().removeClass('has-error');
		}
		var new_contact_html = '<div class="list-group-item" data-address="'+ address +'" data-email="'+ email +'" data-mobile="'+ mobile +'" data-group="'+ group +', all-contacts" >' + name + '</div>';
		$('.list-group').append(new_contact_html);

		contact_list = $('.list-group-item');
	});
	// Edit contact button
	$('#button-edit').on('click', function() {
		var active_item = $('.active');
		contact_form.removeClass('hidden');
		contact_info.addClass('hidden');
		$('#button-save').addClass('hidden');
		$('#button-update').removeClass('hidden');

		contact_name_input.val( active_item.text() );
		contact_address_input.val( active_item.data('address'));
		contact_email_input.val( active_item.data('email'));
		contact_mobile_input.val( active_item.data('mobile') );
		contact_form_group_input.val( 
			active_item.data('group').split(',')[0] 
			);
	});

	// Update contact info
	$('#button-update').on('click', function() {

		var name = contact_name_input.val();
		var email = contact_email_input.val();
		var address = contact_address_input.val();
		var mobile = contact_mobile_input.val();
		var group = contact_form_group_input.val();

		if ( name.length === 0 ) {
			console.error('Name field can\'t be blank');
			contact_name_input.parent().addClass('has-error');
			return;
		}
		else {
			contact_name_input.parent().removeClass('has-error');
		}

		if ( address.length === 0 ) {
			console.error('email field can\'t be blank');
			contact_address_input.parent().addClass('has-error');
			return;
		}
		else {
			contact_address_input.parent().removeClass('has-error');
		}
		if ( email.length === 0 ) {
			console.error('email field can\'t be blank');
			contact_email_input.parent().addClass('has-error');
			return;
		}
		else {
			contact_email_input.parent().removeClass('has-error');
		}
		if ( mobile.length === 0 ) {
			console.error('email field can\'t be blank');
			contact_mobile_input.parent().addClass('has-error');
			return;
		}
		else {
			contact_mobile_input.parent().removeClass('has-error');
		}
		// update contact list item data
		$('.active').text( name )
			.data('email', email)
			.data('address', address)
			.data('mobile', mobile)
			.data('group', group + ', all-contacts');

		// hide form and update contact info
		$('#contact-form').addClass('hidden');
		$('#contact-info').removeClass('hidden');

		$('h2').text(name);
		$('#email').text(email);
		$('#adress').text('Adress: '+ address);
		$('#mobile').text('Mobile: '+ mobile);

	});
	// filter contacts by search term
	$('#contact-search').on('keyup', function() {
		var search_term = $('#contact-search').val();

		contact_list.each(function(){
			var name_text = $(this).text().toLowerCase();

			if( name_text.search(search_term) > -1){
				$(this).removeClass('hidden');
			}
			else {
				$(this).addClass('hidden');
			}
		});
	});

	// filter contacts by group name
	$('#contact-group-select').change(function() {
		var selected_group = $("#contact-group-select option:selected").val();

		contact_list.each(function(){
			var group_text = $(this).data('group');

			if( group_text.search(selected_group) > -1){
				$(this).removeClass('hidden');
			}
			else {
				$(this).addClass('hidden');
			}
		});

	});
});

