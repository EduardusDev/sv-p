(function ($) {
    $.fn.toJSON = function () {
        var $elements = {};
        var $form = $(this);
        $form.find('input, select, textarea').each(function () {
            var name = $(this).attr('name')
            var type = $(this).attr('type')
            if (name) {
                var $value;
                if (type == 'radio') {
                    $value = $('input[name=' + name + ']:checked', $form).val()
                } else if (type == 'checkbox') {
                    $value = $(this).is(':checked')
                } else {
                    $value = $(this).val()
                }
                $elements[$(this).attr('name')] = $value
            }
        });
        return JSON.stringify($elements)
    };
    $.fn.fromJSON = function (json_string) {
        var $form = $(this)
		console.log("1");
        var data = JSON.parse(json_string)
        $.each(data, function (key, value) {
            var $elem = $('[name="' + key + '"]', $form)
            var type = $elem.first().attr('type')
            if (type == 'radio') {
                $('[name="' + key + '"][value="' + value + '"]').prop('checked', true)
            } else if (type == 'checkbox' && (value == true || value == 'true')) {
                $('[name="' + key + '"]').prop('checked', true)
            } else {
                $elem.val(value)
            }
        })
    };
}(jQuery));

$(document).ready(() => {
    authBtn = $('.js-btn-auth');
    // Сохраниние данных с полей (Авторизация - Кнопка "Войти")
    authBtn.on('click', () => {
        let authData = $('#auth-form').toJSON();
		console.log(authData);
        mp.trigger('signin', authData);
    });
});
function checkAuth(str) {

    if(str){
        var form_data = str;
        if(typeof form_data != undefined && typeof form_data['remember'] != undefined && form_data['remember']==true)
        {
			
            $('#entry-password-id').val(form_data['password']);
            $('#entry-login-id').val(form_data['login']);
            $('#remember-me-id').prop('checked', form_data['remember']);
        }
   }
}

function toslots(data, genders) {
    //slots.loading(3500);
    slots.activePage = 1;
    data = JSON.parse(data);
    genders = JSON.parse(genders);
    
    if (data[0] == -1) {
        slots.list[0].type = 'free';
    }
    else {
        if (data[0][0] == 'ban') {
            slots.list[0].type = 'lock';
            slots.list[0].cause = data[0][1];
            slots.list[0].admin = data[0][2];
            slots.list[0].bandate = data[0][3];
            slots.list[0].undate = data[0][4];
        }
        else {

            slots.list[0].name = data[0][0];
            slots.list[0].sername = data[0][1];
            slots.list[0].lvl = data[0][2];
            slots.list[0].exp[0] = data[0][3];
            slots.list[0].exp[1] = 3 + data[0][2] * 3;
            slots.list[0].fraction = data[0][4];
            slots.list[0].money = data[0][5];
            slots.list[0].bank = data[0][6];
            //slots.slotL[8] = genders[0]; Пол
            slots.list[0].type = 'active';
        }
    }

    if (data[1] == -1) {
        slots.list[1].type = 'free';
    }
    else {
        if (data[0][1] == 'ban') {
            slots.list[1].type = 'lock';
            slots.list[1].cause = data[1][1];
            slots.list[1].admin = data[1][2];
            slots.list[1].bandate = data[1][3];
            slots.list[1].undate = data[1][4];
        }
        else {
            slots.list[1].name = data[1][0];
            slots.list[1].sername = data[1][1];
            slots.list[1].lvl = data[1][2];
            slots.list[1].exp[0] = data[1][3];
            slots.list[1].exp[1] = 3 + data[1][2] * 3;
            slots.list[1].fraction = data[1][4];
            slots.list[1].money = data[1][5];
            slots.list[1].bank = data[1][6];
            //slots.slotL[8] = genders[0]; Пол
            slots.list[1].type = 'active';
        }
    }


    if (data[2] == -1) {
        slots.list[2].type = 'free';
    }  else if (data[2] === -2) {
        slots.list[2].type = 'lock';
    }
    else {
        if (data[2][0] == 'ban') {
            slots.list[2].type = 'lock';
            slots.list[2].cause = data[2][1];
            slots.list[2].admin = data[2][2];
            slots.list[2].bandate = data[2][3];
            slots.list[2].undate = data[2][3];
        } else {
            slots.list[2].name = data[2][0];
            slots.list[2].sername = data[2][1];
            slots.list[2].lvl = data[2][2];
            slots.list[2].exp[0] = data[2][3];
            slots.list[2].exp[1] = 3 + data[2][2] * 3;
            slots.list[2].fraction = data[2][4];
            slots.list[2].money = data[2][5];
            slots.list[2].bank = data[2][6];
            //slots.slotL[8] = genders[0]; Пол
            slots.list[2].type = 'active';
        }
    }


    slots.redbucks = data[3];
    slots.login = data[4];
}

function unlockSlot(data) {
    slots.list[2].type = 'free';
    slots.redbucks = data;
}

function delchar(data) {
    switch (data) {
        case 1:
            slots.list[0].type = 'free';
            slots.list[0].page = 0;
            return;
        case 2:
            slots.list[1].type = 'free';
            slots.list[1].page = 0;
            return;
        case 3:
            slots.list[2].type = 'free';
            slots.list[2].page = 0;
            return;
    }
}


function set(data) {
    data = JSON.parse(data);

    slots.activePage = 2;

    slots.spawn[1].type = data[1];
    slots.spawn[2].type = data[2];
}

