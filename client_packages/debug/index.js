//VARS
state = true;
//FUCTIONS

mp.keys.bind(0x71, true, function() {         //F2 Will show up the Position change the Keyhexcode for an other key
  if(state == true){
    mp.events.add('render', (player) => {
     const playerPos = mp.players.local.position
      mp.game.graphics.drawText("POS x: "+ playerPos.x + " y: " + playerPos.y + " z: " + playerPos.z, [0.5, 0.005], 
      {
        font: 4,
        color: [255, 255, 255, 255],
        scale: [1.0, 1.0],
        outline: true
      });
     });
     state = false;
    return;
  }
  if (state == false) {
    mp.game.graphics.removeText();
    state = true;
    return;
  }
});
