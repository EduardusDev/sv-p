mp.events.add("console", (text) => {
    mp.events.callRemote("console", text);
  });
global.localplayer = mp.players.local;
global.F2 = false;
mp.keys.bind(0x71, true, function () {
    if(!F2){ mp.gui.cursor.show(true, true); F2 = true; }
    else{ mp.gui.cursor.show(false, false); F2 = false; }
});
global.playerStop = false;
mp.events.add("render",() => {
    if(playerStop){
        mp.game.controls.disableAllControlActions(2);
        mp.game.controls.enableControlAction(2, 30, true);
        mp.game.controls.enableControlAction(2, 31, true);
        mp.game.controls.enableControlAction(2, 32, true);
        mp.game.controls.enableControlAction(2, 1, true);
        mp.game.controls.enableControlAction(2, 2, true);
    }
});
function browser(value){
    if(value){
        F2 = true;
        playerStop = true;
        mp.gui.cursor.show(true, true)
        mp.gui.chat.activate(false); //Выключает чат
        mp.gui.chat.show(false);//Скрыть чат
        mp.game.ui.displayRadar(false);//Скрывает радар
        //menus.execute('openMenuE.active=0');
    }else{
        F2 = false;
        playerStop = false;
        mp.gui.chat.activate(true); //Активирует чат
        mp.gui.chat.show(true); //Включаем чат
        mp.gui.cursor.show(false, false); //Выключает курсор
        mp.game.ui.displayRadar(true); //Включаем карту
    }
}
exports.browser = browser;
function html(active,name,name2,descr){
    if(active){
        name.execute(name2+'.active=1');
        name.execute(`${name2}.${JSON.stringify(descr)}`);
    }else{
        name.destroy();
    }
}

exports.html = html;


mp.events.add('create:camera', () => {
    localplayer.freezePosition(true);
    bodyCamStart = localplayer.position;
    var camValues = { Angle: localplayer.getRotation(2).z + 90, Dist: 3, Height: 0.2 };
    var pos = getCameraOffset(new mp.Vector3(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height), camValues.Angle, camValues.Dist);
    bodyCam = mp.cameras.new('default', pos, new mp.Vector3(0, 0, 0), 50);
    bodyCam.pointAtCoord(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height);
    bodyCam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 500, true, false);
});
function getCameraOffset(pos, angle, dist) {
    angle = angle * 0.0174533;
    pos.y = pos.y + dist * Math.sin(angle);
    pos.x = pos.x + dist * Math.cos(angle);
    return pos;
}
var bodyCamValues = {
    "hair": { Angle: 0, Dist: 0.5, Height: 0.7 },
    "beard": { Angle: 0, Dist: 0.5, Height: 0.7 },
    "eyebrows": { Angle: 0, Dist: 0.5, Height: 0.7 },
    "chesthair": { Angle: 0, Dist: 1, Height: 0.2 },
    "lenses": { Angle: 0, Dist: 0.5, Height: 0.7 },
    "lipstick": { Angle: 0, Dist: 0.5, Height: 0.7 },
    "blush": { Angle: 0, Dist: 0.5, Height: 0.7 },
    "makeup": { Angle: 0, Dist: 0.5, Height: 0.7 },

    "torso": [
        { Angle: 0, Dist: 1, Height: 0.2 },
        { Angle: 0, Dist: 1, Height: 0.2 },
        { Angle: 0, Dist: 1, Height: 0.2 },
        { Angle: 180, Dist: 1, Height: 0.2 },
        { Angle: 180, Dist: 1, Height: 0.2 },
        { Angle: 180, Dist: 1, Height: 0.2 },
        { Angle: 180, Dist: 1, Height: 0.2 },
        { Angle: 305, Dist: 1, Height: 0.2 },
        { Angle: 55, Dist: 1, Height: 0.2 },
    ],
    "head": [
        { Angle: 0, Dist: 1, Height: 0.5 },
        { Angle: 305, Dist: 1, Height: 0.5 },
        { Angle: 55, Dist: 1, Height: 0.5 },
        { Angle: 180, Dist: 1, Height: 0.5 },
        { Angle: 0, Dist: 0.5, Height: 0.5 },
        { Angle: 0, Dist: 0.5, Height: 0.5 },
    ],
    "leftarm": [
        { Angle: 55, Dist: 1, Height: 0.0 },
        { Angle: 55, Dist: 1, Height: 0.1 },
        { Angle: 55, Dist: 1, Height: 0.1 },
    ],
    "rightarm": [
        { Angle: 305, Dist: 1, Height: 0.0 },
        { Angle: 305, Dist: 1, Height: 0.1 },
        { Angle: 305, Dist: 1, Height: 0.1 },
    ],
    "leftleg": [
        { Angle: 55, Dist: 1, Height: -0.6 },
        { Angle: 55, Dist: 1, Height: -0.6 },
    ],
    "rightleg": [
        { Angle: 305, Dist: 1, Height: -0.6 },
        { Angle: 305, Dist: 1, Height: -0.6 },
    ],
};
global.bodyCam = null;
global.bodyCamStart = new mp.Vector3(0, 0, 0);