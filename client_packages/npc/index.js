let ped = mp.peds.new(
    mp.game.joaat('ig_abigail'), 
    new mp.Vector3(-54.05,67.92,71.96),
    90.0,
    mp.players.local.dimension
  );
  
  mp.peds.newLegacy = (hash, position, heading, streamIn, dimension) => {
    let ped = mp.peds.new(hash, position, heading, dimension);
    ped.streamInHandler = streamIn;
    return ped;
  };


