var spawnmenu = new Vue({
    el: "#spawnmenu",
    data: {
        active: false,
    },
    methods: {
        tp: function(type){
            mp.trigger('spawnmenu:spawn', type);
        }
    }
});