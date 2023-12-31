mp.events.addCommand('money', (player) => {
    player.outputChatBox(`Money: $${player.data.money}`);
});

mp.events.addCommand('setmoney', (player, num) => {
    if(!num || isNaN(num)) return player.outputChatBox('SYNTAX: /setmoney [amount]');
    gm.mysql.handle.query('UPDATE `accounts` SET money = ? WHERE username = ?', [num, player.name], function(err, res){
        if(!err){
            player.data.money = num;
            player.outputChatBox("Money Updated");
        } else {
            console.log(err)
        }
    });
});

mp.events.addCommand('sethealth', (player, health) => {
    if(!health || isNaN(health)) return player.outputChatBox('SYNTAX: /sethealth [amount]');
    gm.mysql.handle.query('UPDATE `accounts` SET health = ? WHERE username = ?', [health, player.name], function(err, res){
        if(!err){
            player.health = parseInt(health);
            player.outputChatBox("Health Updated");
        } else {
            console.log(err)
        }
    });
});

mp.events.addCommand('setarmour', (player, armour) => {
    if(!armour || isNaN(armour)) return player.outputChatBox('SYNTAX: /setarmour [amount]');
    gm.mysql.handle.query('UPDATE `accounts` SET armour = ? WHERE username = ?', [armour, player.name], function(err, res){
        if(!err){
            player.armour = parseInt(armour);
            player.outputChatBox("Armour Updated");
        } else {
            console.log(err)
        }
    });
});

mp.events.addCommand('stats', (player) => {
    player.outputChatBox(`Money: ${player.data.money} X: ${player.position.x.toFixed(2)} Y: ${player.position.y.toFixed(2)} Z: ${player.position.z.toFixed(2)}`);
});



const fs = require("fs");
const saveFile = "saved_posistion.txt";
mp.events.addCommand("pos", (player, name = "No name") => {
    let pos = (player.vehicle) ? player.vehicle.position : player.position;
    let rot = (player.vehicle) ? player.vehicle.rotation : player.heading;

    fs.appendFile(saveFile, `Координаты: {"x":${pos.x}, "y":${pos.y}, "z":${pos.z}} | ${(player.vehicle) ? `Поворот: {"x":${rot.x}, "y":${rot.y}, "z":${rot.z}}` : `Поворот: ${rot}`} | ${(player.vehicle) ? "В машине" : "Не в машине"} - ${name}\r\n`, (err) => {
        if (err) {
            player.notify(`~r~Координаты не сохранены. ~w~${err.message}`);
        } else {
            player.notify(`~g~Координаты сохранены в файл. ~w~(${name})`);
        }
    });
});