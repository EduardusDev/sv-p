mp.events.addCommand("pos", (player) => {                                    // Defines the command.
    let playerName = player.name                                             // Getting Playersname
    const playerPos = player.position                                        // Position data.
    console.log("Position from: "+ player.name)                              // Puts the Playername out in the console  
    console.log("POS x: " + playerPos.x + " y: " + playerPos.y + " z: " + playerPos.z)         // Position output.
});
