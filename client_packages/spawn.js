let camspawn;
let spawnscoordsdsd;
var spawnmenu = mp.browsers.new("package://cef/Spawn.html");
const funciones = require('./modules')
mp.events.add("player:spawn:in", (data) => {
  funciones.browser(true);
  spawnscoordsdsd = data;
  funciones.html(true,spawnmenu,"spawnmenu",null);
  camspawn = mp.cameras.new('default', new mp.Vector3(0,0,700), new mp.Vector3(-90,0,0), 65);
  mp.game.cam.renderScriptCams(true, false, 0, true, false);
});

let buton = 0;
mp.events.add("spawnmenu:spawn", (type) => {
  if(buton == 1) return;
  buton = 1;
  if(type == 1){
    camspawn = mp.cameras.new('default', new mp.Vector3(spawnscoordsdsd.spawn.x,spawnscoordsdsd.spawn.y,1000), new mp.Vector3(-90,0,0), 65);
    mp.events.callRemote("set:spawn:pos:pl", JSON.stringify(spawnscoordsdsd.spawn));
  }
  if(type == 2){
    camspawn = mp.cameras.new('default', new mp.Vector3(spawnscoordsdsd.player.x,spawnscoordsdsd.player.y,1000), new mp.Vector3(-90,0,0), 65);
    mp.events.callRemote("set:spawn:pos:pl", JSON.stringify(spawnscoordsdsd.player));
  }
  setTimeout(() => {
    funciones.html(false,spawnmenu,"spawnmenu",null);
    funciones.browser(false);
    mp.game.cam.renderScriptCams(false, true, 0, true, false);
  }, 1000);
});