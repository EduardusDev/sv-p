var attachedObjects = [];

mp.events.add('attachObject', attachObject);
mp.events.add('detachObject', function (player) {
    try {
        if (player && mp.players.exists(player)) {
            if (attachedObjects[player.id] != undefined) attachedObjects[player.id].destroy();
            attachedObjects[player.id] = undefined;
        }
    } catch (e) { } 
});

function attachObject(player) {
    try {
        if (player && mp.players.exists(player)) {
            if (attachedObjects[player.id] != undefined) attachedObjects[player.id].destroy();

            if (player.getVariable('attachedObject') == null) return;
            let data = JSON.parse(player.getVariable('attachedObject'));
            let boneID = player.getBoneIndex(data.Bone);
            var object = mp.objects.new(data.Model, player.position,
                {
                    rotation: new mp.Vector3(0, 0, 0),
                    alpha: 255,
                    dimension: player.dimension
                });

            waitEntity(object).then(() => {
                object.attachTo(player.handle, boneID, data.PosOffset.x, data.PosOffset.y, data.PosOffset.z, data.RotOffset.x, data.RotOffset.y, data.RotOffset.z, true, true, false, false, 0, true);
                attachedObjects[player.id] = object;
            });
        }

        function waitEntity(entity){
            return new Promise(resolve => {
                let wait = setInterval(() => {
                    if(mp.game.entity.isAnEntity(entity.handle)){
                        clearInterval(wait);
                        resolve();
                    }
                }, 1);
            });
        }
    } catch (e) { } 
}

mp.events.add('toggleInvisible', function (player, toggle) {
    try {
        if (mp.players.exists(player)) {
            if (toggle) player.setAlpha(0);
            else player.setAlpha(255);
        }
    } catch (e) { }
});

mp._events.add("playerQuit", (player) => {
    try {
        if (attachedObjects[player.id] != undefined) {
            attachedObjects[player.id].destroy();
            attachedObjects[player.id] = undefined;
        }
    } catch (e) { }
});
mp.events.add('entityStreamOut', function (entity) {
    try {
        if (entity.type != 'player') return;
        if (attachedObjects[entity.id] != undefined) {
            attachedObjects[entity.id].destroy();
            attachedObjects[entity.id] = undefined;
        }
    } catch (e) { } 
});
const PlayerHash = mp.game.joaat("PLAYER");
const NonFriendlyHash = mp.game.joaat("FRIENDLY_PLAYER");
const FriendlyHash = mp.game.joaat("NON_FRIENDLY_PLAYER");

localplayer.setRelationshipGroupHash(PlayerHash);

mp.game.ped.addRelationshipGroup("FRIENDLY_PLAYER", 0);
mp.game.ped.addRelationshipGroup("NON_FRIENDLY_PLAYER", 0);

mp.game.ped.setRelationshipBetweenGroups(0, PlayerHash, FriendlyHash);

mp.game.ped.setRelationshipBetweenGroups(5, PlayerHash, NonFriendlyHash);
mp.game.ped.setRelationshipBetweenGroups(5, NonFriendlyHash, PlayerHash);

var dmgdisabled = false;
mp.events.add('disabledmg', (toggle) => {
	if(toggle) {
		dmgdisabled = true;
		mp.players.forEachInStreamRange(
			(entity) => {
				if(entity != localplayer) entity.setRelationshipGroupHash(FriendlyHash);
			}
		);
	} else {
		dmgdisabled = false;
		mp.players.forEachInStreamRange(
			(entity) => {
				if(entity != localplayer) entity.setRelationshipGroupHash(NonFriendlyHash);
			}
		);
	}
});

mp._events.add('playerWeaponShot', (targetPosition, targetEntity) => {
    if(dmgdisabled == true) return true;
});

mp.game.streaming.requestAnimDict("creatures@cat@amb@world_cat_sleeping_ground@base");
mp.game.streaming.requestAnimDict("creatures@rottweiler@amb@sleep_in_kennel@");
mp.game.streaming.requestAnimDict("creatures@pug@amb@world_dog_sitting@base");
mp.game.streaming.requestAnimDict("amb@world_human_sunbathe@male@back@base");
mp.game.streaming.requestAnimDict("anim@amb@nightclub@peds@");
mp.game.streaming.requestAnimDict("missheistdocks2aleadinoutlsdh_2a_int");
mp.game.streaming.requestAnimDict("missstrip_club_lean");
mp.game.streaming.requestAnimDict("misstrevor2");
mp.game.streaming.requestAnimDict("creatures@retriever@amb@world_dog_sitting@base");
mp.game.streaming.requestAnimDict("creatures@deer@amb@world_deer_grazing@idle_a");

mp.events.add('entityStreamIn', function (entity) {
    try {
        if (entity.type === 'player') {
			SetWalkStyle(entity, walkstyles[entity.getVariable('playerws')]);
			SetMood(entity, moods[entity.getVariable('playermood')]);
			attachObject(entity);
			if(dmgdisabled == true) entity.setRelationshipGroupHash(FriendlyHash);
			else entity.setRelationshipGroupHash(NonFriendlyHash);
			if (entity.getVariable('INVISIBLE') == true) entity.setAlpha(0);
			else entity.setAlpha(255);
		} else if(entity.type === 'ped') {
			entity.taskLookAt(localplayer.handle, -1, 2048, 3);
			if(entity.getModel() == 1462895032) entity.taskPlayAnim("creatures@cat@amb@world_cat_sleeping_ground@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Cat
			else if(entity.getModel() == 1318032802) entity.taskPlayAnim("creatures@rottweiler@amb@sleep_in_kennel@", "sleep_in_kennel", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Husky
			else if(entity.getModel() == 1832265812) entity.taskPlayAnim("creatures@pug@amb@world_dog_sitting@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Pug
			else if(entity.getModel() == 2910340283) entity.taskPlayAnim("creatures@pug@amb@world_dog_sitting@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Westy
			else if(entity.getModel() == 1125994524) entity.taskPlayAnim("creatures@pug@amb@world_dog_sitting@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Poodle
			else if(entity.getModel() == 940330470) entity.taskPlayAnim("amb@world_human_sunbathe@male@back@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Rashkovsky		
			else if(entity.getModel() == 3613420592) entity.taskPlayAnim("anim@amb@nightclub@peds@", "rcmme_amanda1_stand_loop_cop", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Bony
			else if(entity.getModel() == 3439295882) entity.taskPlayAnim("missheistdocks2aleadinoutlsdh_2a_int", "sitting_loop_wade", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Emma
			else if(entity.getModel() == 1906124788) entity.taskPlayAnim("missstrip_club_lean", "player_lean_rail_loop", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Frank
			
			else if(entity.getModel() == 1596003233) entity.taskPlayAnim("misstrevor2", "gang_chatting_idle02_a", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Muscle Prisoner
			else if(entity.getModel() == 2506301981) entity.taskPlayAnim("creatures@retriever@amb@world_dog_sitting@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Gang Rottweiler
			else if(entity.getModel() == 882848737) entity.taskPlayAnim("creatures@retriever@amb@world_dog_sitting@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Retriever Police
			else if(entity.getModel() == 1126154828) entity.taskPlayAnim("creatures@retriever@amb@world_dog_sitting@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Shephard
			else if(entity.getModel() == 3630914197) entity.taskPlayAnim("creatures@deer@amb@world_deer_grazing@idle_a", "idle_b", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Retriever Police
		}
    } catch (e) { }
});

var dirtt = null;
var lastdirt;
mp.game.vehicle.defaultEngineBehaviour = false;
mp.events.add("VehStream_SetEngineStatus", (veh, status, lights, left, right) => {
    try {
        if (veh !== undefined) {
            veh.setEngineOn(status, status, !status);
			veh.setUndriveable(!status);
			if(lights) {
				if(left) veh.setIndicatorLights(1, true);
				else veh.setIndicatorLights(1, false);
				if(right) veh.setIndicatorLights(0, true);
				else veh.setIndicatorLights(0, false);
			}
        }
    } catch (e) { }
});
mp.events.add("VehStream_SetSirenSound", (veh, status) => {
    try {
        if (veh && mp.vehicles.exists(veh)) {
            if (veh !== undefined && veh.getClass() == 18) veh.setSirenSound(status);
        }
    } catch (e) { }
});

mp.events.add("VehStream_SetLockStatus", (veh, status) => {
    try {
        if (veh && mp.vehicles.exists(veh)) {
            if (veh !== undefined) {
                if (status) {
                    veh.setDoorsLocked(2);
					mp.game.audio.playSoundFromEntity(1, "Remote_Control_Close", veh.handle, "PI_Menu_Sounds", true, 0);
                } else {
                    veh.setDoorsLocked(1);
					mp.game.audio.playSoundFromEntity(1, "Remote_Control_Open", veh.handle, "PI_Menu_Sounds", true, 0);
				}
            }
        }
    } catch (e) { }
});
mp.events.add("VehStream_PlayerExitVehicle", (entity) => {
    setTimeout(() => {
        var Status = [];
        let y = 0;
        for (y = 0; y < 8; y++) {
            if (entity.isDoorDamaged(y)) {
                Status.push(2);
            }
            else if (entity.getDoorAngleRatio(y) > 0.15) {
                Status.push(1);
            }
            else {
                Status.push(0);
            }
        }
        mp.events.callRemote("VehStream_SetDoorData", entity, Status[0], Status[1], Status[2], Status[3], Status[4], Status[5], Status[6], Status[7]);

        Status = [];
        if (entity.isWindowIntact(0)) {
            if (entity.getBoneIndexByName("window_rf") === -1) {
                Status.push(1);
            }
            else {
                Status.push(0);
            }
        }
        else {
            Status.push(2);
        }
        if (entity.isWindowIntact(1)) {
            if (entity.getBoneIndexByName("window_lf") === -1) {
                Status.push(1);
            }
            else {
                Status.push(0);
            }
        }
        else {
            Status.push(2);
        }
        if (entity.isWindowIntact(2)) {
            if (entity.getBoneIndexByName("window_rr") === -1) {
                Status.push(1);
            }
            else {
                Status.push(0);
            }
        }
        else {
            Status.push(2);
        }
        if (entity.isWindowIntact(3)) {
            if (entity.getBoneIndexByName("window_lr") === -1) {
                Status.push(1);
            }
            else {
                Status.push(0);
            }
        }
        else {
            Status.push(2);
        }
        mp.events.callRemote("VehStream_SetWindowData", entity, Status[0], Status[1], Status[2], Status[3]);

        Status = [];
        if (!entity.isTyreBurst(0, false)) {
            Status.push(0);
        }
        else if (entity.isTyreBurst(0, false)) {
            Status.push(1);
        }
        else {
            Status.push(2);
        }

        if (!entity.isTyreBurst(1, false)) {
            Status.push(0);
        }
        else if (entity.isTyreBurst(1, false)) {
            Status.push(1);
        }
        else {
            Status.push(2);
        }

        if (!entity.isTyreBurst(2, false)) {
            Status.push(0);
        }
        else if (entity.isTyreBurst(2, false)) {
            Status.push(1);
        }
        else {
            Status.push(2);
        }

        if (!entity.isTyreBurst(3, false)) {
            Status.push(0);
        }
        else if (entity.isTyreBurst(3, false)) {
            Status.push(1);
        }
        else {
            Status.push(2);
        }

        if (!entity.isTyreBurst(4, false)) {
            Status.push(0);
        }
        else if (entity.isTyreBurst(4, false)) {
            Status.push(1);
        }
        else {
            Status.push(2);
        }

        if (!entity.isTyreBurst(5, false)) {
            Status.push(0);
        }
        else if (entity.isTyreBurst(5, false)) {
            Status.push(1);
        }
        else {
            Status.push(2);
        }

        if (!entity.isTyreBurst(6, false)) {
            Status.push(0);
        }
        else if (entity.isTyreBurst(6, false)) {
            Status.push(1);
        }
        else {
            Status.push(2);
        }

        if (!entity.isTyreBurst(7, false)) {
            Status.push(0);
        }
        else if (entity.isTyreBurst(7, false)) {
            Status.push(1);
        }
        else {
            Status.push(2);
        }

        if (!entity.isTyreBurst(45, false)) {
            Status.push(0);
        }
        else if (entity.isTyreBurst(45, false)) {
            Status.push(1);
        }
        else {
            Status.push(2);
        }

        if (!entity.isTyreBurst(47, false)) {
            Status.push(0);
        }
        else if (entity.isTyreBurst(47, false)) {
            Status.push(1);
        }
        else {
            Status.push(2);
        }

        mp.events.callRemote("VehStream_SetWheelData", entity, Status[0], Status[1], Status[2], Status[3], Status[4], Status[5], Status[6], Status[7], Status[8], Status[9]);
    }, 2500);
});

mp.events.add("VehStream_PlayerEnterVehicle", (entity, seat, enginestate) => {
	mp.events.call("VehStream_SetEngineStatus", entity, enginestate, false, false, false);
});

mp.events.add({
  'playerEnterVehicle': (vehicle, seat) => {
    if (mp.players.local.getSeatIsTryingToEnter() !== -1 || vehicle.getIsEngineRunning()) {
      return;
    }
    vehicle.setEngineOn(false, false, false);
  }
});
	
mp.events.add("playerEnterVehicle", (entity, seat) => {
    try {
        if (seat == 0) {
            lastdirt = entity.getDirtLevel();
            if (dirtt != null) clearInterval(dirtt);
            dirtt = setInterval(function () {
                dirtlevel(entity);
            }, 20000);

            if (entity.getVariable('BOOST') != undefined) {
                var boost = entity.getVariable('BOOST');
                entity.setEnginePowerMultiplier(boost);
                entity.setEngineTorqueMultiplier(boost);
            }
        }
    } catch (e) { }
});

mp.events.add("playerLeaveVehicle", (entity) => {
    try {
        if (dirtt != null) {
            clearInterval(dirtt);
            dirtt = null;
        }
    } catch (e) { }
});

mp.events.add("VehStream_SetVehicleDoorStatus_Single", (veh, door, state) => {
    try {
        if (veh && mp.vehicles.exists(veh)) {
            if (veh !== undefined) {
                if (state === 0) {
                    veh.setDoorShut(door, false);
                }
                else if (state === 1) {
                    veh.setDoorOpen(door, false, false);
                }
                else {
                    veh.setDoorBroken(door, true);
                }
            }
        }
    } catch (e) { }
});

mp.events.add("VehStream_SetVehicleDoorStatus", (...args) => {
    try {
        if (args[0] && mp.vehicles.exists(args[0])) {
            if (args[0] !== undefined) {
                let y = 0;
                for (y = 1; y < args.length; y++) {
                    if (args[y] === 0) {
                        args[0].setDoorShut(y - 1, false);
                    }
                    else if (args[y] === 1) {
                        args[0].setDoorOpen(y - 1, false, false);
                    }
                    else {
                        args[0].setDoorBroken(y - 1, true);
                    }
                }
            }
        }
    } catch (e) { }
});

mp.events.add("VehStream_FixStreamIn", (entity, data) => {
    if (entity.type !== "vehicle") return;
    if (entity && mp.vehicles.exists(entity)) {
        let typeor = typeof entity.getVariable('VehicleSyncData');
        let actualData = entity.getVariable('VehicleSyncData');

        //Do it anyway
        entity.setUndriveable(true);
		
		//if(entity.getClass() == 18) entity.setSirenSound(entity.getVariable('SIRENSOUND'));
		
        if (typeor !== 'undefined') {
            actualData = JSON.parse(actualData);
            entity.setEngineOn(actualData.Engine, actualData.Engine, !actualData.Engine);
            entity.setUndriveable(true);
            entity.setDirtLevel(actualData.Dirt);

            if (actualData.Locked) entity.setDoorsLocked(2);
            else entity.setDoorsLocked(1);
			
			if(actualData.RightIL) entity.setIndicatorLights(0, true);
			else entity.setIndicatorLights(0, false);
			if(actualData.LeftIL) entity.setIndicatorLights(1, true);
			else entity.setIndicatorLights(1, false);
				
            for (x = 0; x < 8; x++) {
                if (actualData.Door[x] === 1)
                    entity.setDoorOpen(x, false, false);
                else if (actualData.Door[x] === 0)
                    entity.setDoorShut(x, true);
                else
                    entity.setDoorBroken(x, true);
            }
        }

        data = JSON.parse(data);
        entity.setNumberPlateText(data[0]);
        entity.setColours(data[1], data[2]);
        if (data[3] != null) {
            //mp.gui.chat.push('VehStream_FixStreamIn check');
            data = data[3];

            entity.setMod(4, data.Muffler);
            entity.setMod(3, data.SideSkirt);
            entity.setMod(7, data.Hood);
            entity.setMod(0, data.Spoiler);
            entity.setMod(6, data.Lattice);
            entity.setMod(8, data.Wings);
            entity.setMod(10, data.Roof);
            entity.setMod(48, data.Vinyls);
            entity.setMod(1, data.FrontBumper);
            entity.setMod(2, data.RearBumper);

            entity.setMod(11, data.Engine);
            entity.setMod(18, data.Turbo);
            entity.setMod(13, data.Transmission);
            entity.setMod(15, data.Suspension);
            entity.setMod(12, data.Brakes);
			if(data.Headlights >= 0) {
				entity.setMod(22, 0);
				SetHLColor(entity, entity.getVariable('hlcolor'));
			} else entity.setMod(22, data.Headlights);
            entity.setMod(14, data.Horn);

            entity.setWindowTint(data.WindowTint);

            entity.setCustomPrimaryColour(data.PrimColor.Red, data.PrimColor.Green, data.PrimColor.Blue);
            entity.setCustomSecondaryColour(data.SecColor.Red, data.SecColor.Green, data.SecColor.Blue);

            entity.setWheelType(data.WheelsType);
            entity.setMod(23, data.Wheels);
        }
    }
});

	
function dirtlevel(entity) {
    try {
        if (entity && mp.vehicles.exists(entity)) {
            if (localplayer.vehicle == entity && entity.getPedInSeat(-1) == localplayer.handle)
                mp.events.call("VehStream_GetVehicleDirtLevel", entity);
        }
        else {
            if (dirtt != null) {
                clearInterval(dirtt);
                dirtt = null;
            }
        }
    } catch (e) {
    }
};

mp.events.add("VehStream_SetVehicleDirtLevel", (entity, dirt) => {
    try {
        if (entity && mp.vehicles.exists(entity)) {
            if (entity !== undefined) {
                entity.setDirtLevel(dirt);
                if (entity.getPedInSeat(-1) == mp.players.local.handle) {
                    lastdirt = dirt;
                }
            }
        }
    } catch (e) {
    }
});
mp.events.add("VehStream_GetVehicleDirtLevel", (entity) => {
    try {
        if (entity && mp.vehicles.exists(entity)) {
            if (entity !== undefined) {
                if (entity.getPedInSeat(-1) == mp.players.local.handle) {
                    let curdirt = parseFloat(entity.getDirtLevel());
                    let raznica = parseFloat((curdirt - lastdirt));
                    if (raznica >= 0.01) {
                        raznica = raznica/3;
                        let newdirt = parseFloat((lastdirt + raznica));
                        if (newdirt > 15) newdirt = 15;
                        lastdirt = newdirt;
                        mp.events.callRemote("VehStream_SetVehicleDirt", entity, newdirt);
                    }
                }
            }
        }
    } catch (e) {
    }
});

mp.events.add("VehStream_SetVehicleDoorStatus_Single", (veh, door, state) => {
    if (veh !== undefined) {
        if (state === 0) {
            veh.setDoorShut(door, false);
        }
        else if (state === 1) {
            veh.setDoorOpen(door, false, false);
        }
        else {
            veh.setDoorBroken(door, true);
        }
    }
});

mp.events.add("VehStream_SetVehicleDoorStatus", (...args) => {
    if (args[0] !== undefined) {
        let y = 0;
        for (y = 1; y < args.length; y++) {
            if (args[y] === 0) {
                args[0].setDoorShut(y - 1, false);
            }
            else if (args[y] === 1) {
                args[0].setDoorOpen(y - 1, false, false);
            }
            else {
                args[0].setDoorBroken(y - 1, true);
            }
        }
    }
});

mp.events.add("VehStream_SetVehicleWindowStatus_Single", (veh, windw, state) => {
    if (veh !== undefined) {
        if (state === 1) {
            veh.rollDownWindow(windw);
        }
        else if (state === 0) {
            veh.fixWindow(windw);
            veh.rollUpWindow(windw);
        }
        else {
            veh.smashWindow(windw);
        }
    }
});

mp.events.add("VehStream_SetVehicleWindowStatus", (...args) => {
    if (args[0] !== undefined) {
        let y = 0;
        for (y = 1; y < 4; y++) {
            if (args[y] === 1) {
                args[0].rollDownWindow(y - 1);
            }
            else if (args[y] === 0) {
                args[0].fixWindow(y - 1);
                args[0].rollUpWindow(y - 1);
            }
            else {
                args[0].smashWindow(y - 1);
            }
        }
    }
});

mp.events.add("VehStream_SetVehicleWheelStatus_Single", (veh, wheel, state) => {
    if (veh !== undefined) {
        if (wheel === 9) {
            if (state === 1) {
                veh.setTyreBurst(45, false, 1000);
            }
            else if (state === 0) {
                veh.setTyreFixed(45);
            }
            else {
                veh.setTyreBurst(45, true, 1000);
            }
        }
        else if (wheel === 10) {
            if (state === 1) {
                veh.setTyreBurst(47, false, 1000);
            }
            else if (state === 0) {
                veh.setTyreFixed(47);
            }
            else {
                veh.setTyreBurst(47, true, 1000);
            }
        }
        else {
            if (state === 1) {
                veh.setTyreBurst(wheel, false, 1000);
            }
            else if (state === 0) {
                veh.setTyreFixed(wheel);
            }
            else {
                veh.setTyreBurst(wheel, true, 1000);
            }
        }
    }
});

mp.events.add("VehStream_SetVehicleWheelStatus", (...args) => {
    if (args[0] !== undefined) {
        let y = 0;
        for (y = 1; y < args.length; y++) {
            if (y === 9) {
                if (args[y] === 1) {
                    args[0].setTyreBurst(45, false, 1000);
                }
                else if (args[y] === 0) {
                    args[0].setTyreFixed(45);
                }
                else {
                    args[0].setTyreBurst(45, true, 1000);
                }
            }
            else if (y === 10) {
                if (args[y] === 1) {
                    args[0].setTyreBurst(47, false, 1000);
                }
                else if (args[y] === 0) {
                    args[0].setTyreFixed(47);
                }
                else {
                    args[0].setTyreBurst(47, true, 1000);
                }
            }
            else {
                if (args[y] === 1) {
                    args[0].setTyreBurst(y - 1, false, 1000);
                }
                else if (args[y] === 0) {
                    args[0].setTyreFixed(y - 1);
                }
                else {
                    args[0].setTyreBurst(y - 1, true, 1000);
                }
            }
        }
    }
});

//Sync data on stream in
mp.events.add("entityStreamIn", (entity) => {
    try {
        if (entity.type !== "vehicle") return;
        if (entity && mp.vehicles.exists(entity))
        {
            let typeor = typeof entity.getVariable('VehicleSyncData');
            let actualData = entity.getVariable('VehicleSyncData');
            entity.setLoadCollisionFlag(true);
            entity.trackVisibility();
            let x = 0;
            for (x = 0; x < 8; x++) {
                entity.setDoorBreakable(x, false);
            }
            entity.setUndriveable(true);

            if (typeor !== 'undefined') {
                actualData = JSON.parse(actualData);
                entity.setEngineOn(actualData.Engine, true, false);
                entity.setUndriveable(true);

                if (actualData.Locked)
                    entity.setDoorsLocked(2);
                else
                    entity.setDoorsLocked(1);

                for (x = 0; x < 8; x++) {
                    if (actualData.Door[x] === 1)
                        entity.setDoorOpen(x, false, false);
                    else if (actualData.Door[x] === 0)
                        entity.setDoorShut(x, true);
                    else
                        entity.setDoorBroken(x, true);
                }
				
				for (x = 0; x < 4; x++) {
					if (actualData.Window[x] === 0)
						entity.fixWindow(x);
					else if (actualData.Window[x] === 1)
						entity.rollDownWindow(x);
					else
						entity.smashWindow(x);
                }
				
				for (x = 0; x < 8; x++) {
					if (actualData.Wheel[x] === 0)
						entity.setTyreFixed(x);
					else if (actualData.Wheel[x] === 1)
						entity.setTyreBurst(x, false, 0);
					else
						entity.setTyreBurst(x, true, 1000);
				}

                if (typeof entity.getVariable('HeadlightsColor') !== 'undefined') {
                    let headlightsColor = entity.getVariable('HeadlightsColor');
                    if (headlightsColor > 0) {
                        entity.setMod(22, 0);
                        mp.game.invoke(global.getNative("_SET_VEHICLE_HEADLIGHTS_COLOUR"), entity.handle, headlightsColor);
                    }
                    else {
                        entity.setMod(22, headlightsColor);
                    }
                }

                if (typeof entity.getVariable('NeonColor') !== 'undefined') {
                    let neonColors = entity.getVariable('NeonColor');

                    entity.setNeonLightsColour(neonColors[0], neonColors[1], neonColors[2]);

                    entity.setNeonLightEnabled(0, true);
                    entity.setNeonLightEnabled(1, true);
                    entity.setNeonLightEnabled(2, true);
                    entity.setNeonLightEnabled(3, true);
                }
            }
            else
                mp.events.callRemote("VehStream_RequestFixStreamIn", entity);

            //Make doors breakable again
            setTimeout(() => {
                for (x = 0; x < 8; x++) {
                    if (entity && mp.vehicles.exists(entity))
                        entity.setDoorBreakable(x, true);
                }
            }, 1500);
        }
    } catch (e) { }
});

mp.keys.bind(0x60, true, _ => {
    if (localPlayer.vehicle && localPlayer.vehicle.getPedInSeat(-1) === localPlayer.handle && localPlayer.vehicle.getClass() === 18) {
        localPlayer.vehicle.getVariable('silentMode') ? mp.game.graphics.notify(`Silent mode is deactivated.`) : mp.game.graphics.notify(`Silent mode is activated.`);
        mp.events.callRemote('syncSirens', localPlayer.vehicle)
    }
});

mp.events.add('entityStreamIn', (entity) => {
    if (entity.type === 'vehicle' && entity.getClass() === 18 && entity.hasVariable('silentMode')) entity.getVariable('silentMode') ? entity.setSirenSound(true) : entity.setSirenSound(false);
    
});

mp.events.addDataHandler("silentMode", (entity, value) => {
    if (entity.type === "vehicle") entity.setSirenSound(value);
});
mp.events.add("VehStream_SetVehicleIndicatorLights_Single", (veh, light, state) => {
	try {
		if (veh && mp.vehicles.exists(veh)) {
			if (veh !== undefined) {
				if (light == 0) {
					if(state) veh.setIndicatorLights(0, true);
					else veh.setIndicatorLights(0, false);
				} else if(light == 1) {
					if(state) veh.setIndicatorLights(1, true);
					else veh.setIndicatorLights(1, false);
				}
			}
		}
	} catch (e) {
	}
});

mp.events.add("VehStream_SetVehicleIndicatorLights", (...args) => {
	try {
		if (args[0] && mp.vehicles.exists(args[0])) {
			if (args[0] !== undefined) {
				let y = 0;
				if(args[1]) args[0].setIndicatorLights(1, true);
				else args[0].setIndicatorLights(1, false);
				if(args[2]) args[0].setIndicatorLights(0, true);
				else args[0].setIndicatorLights(0, false);
			}
		}
	} catch (e) {
	}
});

mp.events.add("VehStream_SetVehicleHeadLightColor", (entity, color) => {
	try {
		if (entity && mp.vehicles.exists(entity)) {
			if (entity !== undefined) SetHLColor(entity,color);
		}
	} catch (e) {
	}
});

function SetHLColor(vehicle, color) {
	try {
		if (vehicle && mp.vehicles.exists(vehicle)) mp.game.invoke('0xE41033B25D003A07', vehicle.handle, color);
	} catch (e) {
	}
}