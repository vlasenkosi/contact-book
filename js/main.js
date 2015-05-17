var CONTACTS = [{
    id: 0,
    name: 'Oleksandr Tsukur',
    email: 'tsuros@gmail.com',
    address: '123 Main str, apt. 34, Springfield, CA 94905',
    mobile: 0589369465,
    group: 'family'
}, {
    id: 1,
    name: 'Oleksandr Zadorozhko',
    email: 'zadorozko@gmail.com',
    address: '53 apt. 34 str NY',
    mobile: 0464950937,
    group: 'clients'
}, {
    id: 2,
    name: 'Vlada Boiko',
    email: 'vladaboiko@gmail.com',
    address: '534 apt. 34 str. SC',
    mobile: 0546074050,
    group: 'co-workers'
}, {
    id: 3,
    name: 'Valentina Tsukur',
    email: 'valentina@gg.com',
    address: '24 apt. 234 str. TX',
    mobile: 0974596952,
    group: 'friends'
}, {
    id: 4,
    name: 'Uncle Sasha',
    email: '33 aptp. 12 str. PN',
    address: 'uncle@gmail.com',
    mobile: 0859749154,
    group: 'co-workers'
}];
var _contacts = CONTACTS;
var GROUPS = ['family', 'co-workers', 'clients', 'friends'];
var _groups = GROUPS;

jQuery(function($) {
    var contact_form = $('#contact-form'),
        contact_info = $('#contact-info'),
        contact_name_input = $('#contact-name'),
        contact_address_input = $('#contact-address'),
        contact_email_input = $('#contact-email'),
        contact_mobile_input = $('#contact-mobile'),
        contact_form_group_input = $('#contact-form-group-select'),
        new_group_input = $('#group-form');

    if (localStorage['contacts'] == undefined) {
        localStorage['contacts'] = JSON.stringify(CONTACTS);
    } else {
        _contacts = JSON.parse(localStorage['contacts']);
    }

    if (localStorage['groups'] == undefined) {
        localStorage['groups'] = JSON.stringify(GROUPS);
    } else {
        _groups = JSON.parse(localStorage['groups']);
    }

    // selects contact on click
    $('.list-group').on('click', '.list-group-item', function() {
        var contact_name = $(this).text();
        var contact_object = getContactByName(contact_name);


        $('h2').text(contact_object.name);
        $('#email').text(contact_object.email);
        $('#adress').text('Adress: ' + contact_object.address);
        $('#mobile').text('Mobile: ' + contact_object.mobile);

        $('.list-group-item').removeClass('active');
        $(this).addClass('active');
        $('.group-create').addClass('hidden');
        $('#card').removeClass('flipped');
        $('#signup-forms').addClass('hidden');
        contact_form.addClass('hidden');
        contact_info.removeClass('hidden');
    });
    // deletes selected contact
    $('#button-delete').on('click', function() {
        var name = $('.active').text();
        var index = getContactIndexByName(name);

        // $('.active').remove();
        _contacts.splice(index, 1);
        localStorage['contacts'] = JSON.stringify(_contacts);
        renderContacts();
        $('.list-group-item').first().click();
        if ($('.list-group-item').length == 0) {
            $('.my-adress').empty()
                .html('<h1 class="text-center">No contacts</h1>')

        };
    });
    // Show form for adding new contact
    $('#add-contact').on('click', function() {
        contact_name_input.val('');
        contact_address_input.val('');
        contact_email_input.val('');
        contact_mobile_input.val('');

        contact_form.removeClass('hidden');
        contact_info.addClass('hidden');
        $('#card').addClass('flipped');
        $('#button-save').removeClass('hidden');
        $('#button-update').addClass('hidden');
        $('.group-create').addClass('hidden');
        $('#signup-forms').addClass('hidden');
    });
    // Register new contact to CB
    $('#button-save').on('click', function() {

        var name = contact_name_input.val(),
            address = contact_address_input.val(),
            email = contact_email_input.val(),
            mobile = contact_mobile_input.val(),
            group = contact_form_group_input.val();
        // console.log(name, address, email, mobile);
        if (name.length === 0 || contactNameExists(name)) {
            console.error('Please fill name field');
            contact_name_input.parent().addClass('has-error');
            return;
        } else {
            contact_name_input.parent().removeClass('has-error');
        }

        if (address.length === 0) {
            console.error('Please fill email field');
            contact_address_input.parent().addClass('has-error');
            return;
        } else {
            contact_address_input.parent().removeClass('has-error');
        }
        if (email.length === 0 || contactEmailExists(email)) {
            console.error('Please fill email field');
            contact_email_input.parent().addClass('has-error');
            return;
        } else {
            contact_email_input.parent().removeClass('has-error');
        }
        if (mobile.length === 0 || contactMobileExists(mobile)) {
            console.error('Please fill email field');
            contact_mobile_input.parent().addClass('has-error');
            return;
        } else {
            contact_mobile_input.parent().removeClass('has-error');
        }

        var new_contact_object = {
            name: name,
            email: email,
            address: address,
            mobile: mobile,
            group: group
        };
        _contacts.push(new_contact_object);
        localStorage['contacts'] = JSON.stringify(_contacts);
        renderContacts();

        $('.group-create').addClass('hidden');
        contact_list = $('.list-group-item');
    });
    // Edit contact button
    $('#button-edit').on('click', function() {

        var active_item = $('.active');
        var contact_obj = getContactByName(active_item.text());
        contact_form.removeClass('hidden');
        // contact_info.addClass('hidden');
        $('#card').addClass('flipped');
        $('#contact-info').addClass('hidden');
        $('#button-save').addClass('hidden');
        $('#button-update').removeClass('hidden');
        $('.group-create').addClass('hidden');



        contact_name_input.val(contact_obj.name);
        contact_address_input.val(contact_obj.address);
        contact_email_input.val(contact_obj.email);
        contact_mobile_input.val(contact_obj.mobile);
        contact_form_group_input.val(contact_obj.group);


    });

    // Update contact info
    $('#button-update').on('click', function() {
        var original_name = $('.active').text().trim();
        var name = contact_name_input.val();
        var email = contact_email_input.val();
        var address = contact_address_input.val();
        var mobile = contact_mobile_input.val();
        var group = contact_form_group_input.val();

        if (name.length === 0) {
            console.error('Name field can\'t be blank');
            contact_name_input.parent().addClass('has-error');
            return;
        } else {
            contact_name_input.parent().removeClass('has-error');
        }

        if (address.length === 0) {
            console.error('email field can\'t be blank');
            contact_address_input.parent().addClass('has-error');
            return;
        } else {
            contact_address_input.parent().removeClass('has-error');
        }
        if (email.length === 0) {
            console.error('email field can\'t be blank');
            contact_email_input.parent().addClass('has-error');
            return;
        } else {
            contact_email_input.parent().removeClass('has-error');
        }
        if (mobile.length === 0) {
            console.error('email field can\'t be blank');
            contact_mobile_input.parent().addClass('has-error');
            return;
        } else {
            contact_mobile_input.parent().removeClass('has-error');
        }
        // update contact list item data
        $('.active').text(name);
        var new_contact_object = {
            name: name,
            email: email,
            address: address,
            mobile: mobile,
            group: group
        };
        var index = getContactIndexByName(original_name);
        _contacts[index] = new_contact_object;
        localStorage['contacts'] = JSON.stringify(_contacts);
        // $('#contact-info').removeClass('hidden');
        $('#card').removeClass('flipped');


        $('h2').text(name);
        $('#email').text(email);
        $('#adress').text('Adress: ' + address);
        $('#mobile').text('Mobile: ' + mobile);

        $('#contact-form').addClass('hidden');
        $('#contact-info').removeClass('hidden');

    });
    // filter contacts by search term
    $('#contact-search-button').on('click', function() {
        var search_term = $('#contact-search').val();

        $('.list-group-item').each(function() {
            var name_text = $(this).text().toLowerCase();

            if (name_text.search(search_term) > -1) {
                $(this).removeClass('hidden');
            } else {
                $(this).addClass('hidden');
            }
        });

    });


    $('#contact-search').on('keyup', function(event) {
        event.preventDefault()
        if (event.which == 13) {
            $('#contact-search-button').click()
        };
        if (event.which == 27) {
            $('#contact-search').val('');
            $('#contact-search-button').click()

        };
    });

    // filter contacts by group name
    $('#contact-group-select').change(function() {
        var selected_group = $("#contact-group-select option:selected").val();

        if ('all-contacts' !== selected_group) {
            _contacts.forEach(function(contact, i) {
                var group_text = contact.group;

                if (group_text.search(selected_group) > -1) {
                    $('.list-group-item').eq(i).removeClass('hidden');
                } else {
                    $('.list-group-item').eq(i).addClass('hidden');
                }

            });
        } else {
            $('.list-group-item').removeClass('hidden');
        }

    });

    // Add new group button
    $('#button-group-save').on('click', function() {

        $('#new-group-modal').on('shown.bs.modal', function() {
            $('#group-input-field').focus();
        })

        var name = $('#group-input-field').val();

        if (name.trim().length === 0) {
            $('#group-input-field').parent().addClass('has-error')
            return;
        };

        if (groupExists(name)) {
            $('#group-input-field').parent().addClass('has-error')
            return;
        }

        // $('#contact-group-select').append(new_group_html);
        // $('#contact-form-group-select').append(new_group_html);
        _groups.push(name);
        localStorage['groups'] = JSON.stringify(_groups);
        renderGroups();
        $('#group-input-field').val('');
        $('#new-group-modal').modal('hide');

    });

    // Focus field
    $('#new-group-modal').on('shown.bs.modal', function() {
        $('#group-input-field').focus();
    });

    // Create group with enter
    $('#group-input-field').on('keyup', function(event) {
        event.preventDefault()
        if (event.which == 13) {
            $('#button-group-save').click()
        };
    });

    // Delete group button
    $('#delete-group-button').on('click', function() {
        var selected = $('#contact-group-select')
            .find('option:selected').attr('value');

        if ('all-contacts' !== selected) {
            // $('[value="' + selected + '"]').remove()


            _groups.splice(_groups.indexOf(selected), 1);
            localStorage['groups'] = JSON.stringify(_groups);
            renderGroups();
        }

    });

    // Sing up button
    $('#signup-button').on('click', function(){
        $('#signup-forms').removeClass('hidden');



        $('#contact-info').addClass('hidden');
        $('#contact-form').addClass('hidden');
    });

    function renderContacts() {
            var i = 0,
                contacts_html = '',
                len = _contacts.length;
            while (i < len) {
                contacts_html += '<div id="' + i + '" class="list-group-item">' + _contacts[i].name + '</div>';

                i++;
            }
            // console.log(contacts_html);
            $('.list-group').html(contacts_html);
        }
        // @returns Object
    function getContactByName(name) {
        var i = 0;
        while (i < _contacts.length) {
            if (name == _contacts[i].name) {
                return _contacts[i];
            }

            i++;
        }
    }

    function getContactIndexByName(name) {
        var i = 0;
        while (i < _contacts.length) {
            if (name == _contacts[i].name) {
                return i;
            }

            i++;
        }
    }

    function contactEmailExists(email) {
        var i = 0;
        while (i < _contacts.length) {
            if (email == _contacts[i].email) {
                return true;
            }

            i++;
        }
        return false;
    }

    function contactMobileExists(mobile) {
        var i = 0;
        while (i < _contacts.length) {
            if (mobile == _contacts[i].mobile) {
                return true;
            }

            i++;
        }
        return false;
    }

    function groupExists(name) {
        var groups = $('#contact-group-select').find('option');

        for (var i = 0; i < groups.length; i++) {
            if (groups.eq(i).text().trim().toLowerCase() === name.trim().toLowerCase()) {
                return true;
            }
        }

        return false;
    };

    function contactNameExists(name) {
        var contacts = $('.list-group').find('.list-group-item');

        for (var i = 0; i < contacts.length; i++) {
            if (contacts.eq(i).text().trim().toLowerCase() === name.trim().toLowerCase()) {
                return true;
            }
        }

        return false;
    };

    function renderGroups() {
        var i = 0,
            groups_html = '<option value="all-contacts">All Contacts</option>',
            len = _groups.length;
        while (i < len) {
            groups_html += '<option value="' + _groups[i].toLowerCase() + '">' + _groups[i] + '</option>';

            i++;
        }
        $('#contact-form-group-select, #contact-group-select').html(groups_html);

    }

    renderContacts();
    renderGroups();
});
