require('./commands.js')

global.gm = {};
gm.mysql = require('./mysql.js');
gm.auth = require('./auth.js');
gm.mysql.connect(function() { });


mp.events.add("playerChat", (player, text) =>
{
	mp.players.broadcast(`${player.name}: ${text}`);
});

mp.events.add("console", (player, text) => {
	console.log(text);
});