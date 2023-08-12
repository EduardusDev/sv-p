mp.events.addCommand("v", (player, vehId) => {
    const vehicle = mp.vehicles.at(vehId);
    if (vehicle) {
      vehicle.spawn(player.position, player.heading);
    }
  });