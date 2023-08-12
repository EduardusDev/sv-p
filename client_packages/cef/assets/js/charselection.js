var charselection = new Vue({
    el: "#charselection",
    data: {
        active: true,
        login:"Test",
        dp:0,
        creator:0,
        stats:0,

        datas:[],
        customization:[],
        player_name:"Test",
        money:0,
        bank:0,
        organization:"No",
        playhourse:0,
    },
    methods: {
        open: function () {
        },
        createbut: function(dat){
            var dats = JSON.parse(dat);
            $('#playersinforms').append($('<div id="characters" id-ch="'+dats.id+'"> <div class="char"> <i style="float: left;" class="fas fa-user"></i> <p class="name">'+dats.firstname+'_'+dats.lastname+'</p> <p class="lvl">'+dats.lvl+'</p> </div> </div>'));
            $('#playersinforms').children('#characters').click(function() {
                var data = charselection.datas;
                var id = $(this).attr('id-ch');
                for (let i = 0; i < data.length; i++) {
                    if(data[i].id == id){
                        charselection.player_name = data[i].firstname+'_'+data[i].lastname;
                        charselection.money = data[i].money;
                        charselection.bank = data[i].bank;
                        charselection.stats = 1;
                        mp.trigger('player:charselection', id);
                        $('#charselection').append($('<div class="enter"><div class="text">Seleccionar</div></div>'));
                        $('.enter').click(function() {
                            mp.trigger('player:enter:server', id);
                        });
                    }
                }
            });
        },
        createbut2: function(){
            $('#playersinforms').append($('<div class="button-create">Crear Personaje</div>'));
            $('.button-create').click(function() {
                charselection.creator = 1;
            });
        },
        create: function(){ this.creator = 1; },
        close_create: function(){ this.creator = 0; },
        deletes: function(){

        }
    }
});

function sendAccountCharacter(){
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    $("#createplayernames").hide();
    mp.trigger("create:charselector", firstName.value, lastName.value);
}