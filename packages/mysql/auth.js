module.exports = {
  registerAccount: function (player) {
    player.position = new mp.Vector3(
      -1905.5416259765625,
      -574.9318237304688,
      19.09
    );
    player.heading = 49.36;
    player.call("create:camera", []);
    player.call("open:charselection", []);
    player.call("but2:charselection", []);
  },
  saveAccount: function (player) {
    var xyz = {
      x: player.position.x,
      y: player.position.y,
      z: player.position.z,
      r: player.heading,
    };
    gm.mysql.handle.query(
      "UPDATE `characters` SET xyz=?,lvl=?,exp=?,health=?,money=?,bank=? WHERE id = ?",
      [
        JSON.stringify(xyz),
        player.data.lvl,
        player.data.exp,
        player.health,
        player.data.money,
        player.data.bank,
        player.data.charid,
      ],
      function (err, res, row) {
        if (err) console.log(err);
      }
    );
  },
  loadAccount: function (player) {
    player.position = new mp.Vector3(
      -1905.5416259765625,
      -574.9318237304688,
      19.09
    );
    player.heading = 49.36;
    player.call("create:camera", []);
    player.call("open:charselection", []);
    gm.mysql.handle.query(
      "SELECT adminlvl,firstname,lastname,lvl,exp,health,id,organization FROM characters WHERE accid = ?",
      [player.data.id],
      function (err, res, row) {
        if (res.length) {
          res.forEach(function (playerData) {
            gm.mysql.handle.query(
              "SELECT * FROM customization WHERE personid = ?",
              [playerData.id],
              function (err, custom, row) {
                if (custom.length) {
                  custom.forEach(function (playerData2) {
                    player.call("but:charselection", [playerData, playerData2]);
                  });
                }
              }
            );
          });
          if (res.length > 2) return;
          player.call("but2:charselection", []);
        } else player.call("but2:charselection", []);
      }
    );
  },
  saveCharenterAccount: function (
    player,
    currentGender,
    father,
    mother,
    similarity,
    skin,
    features,
    appearance_values,
    hair_or_colors
  ) {
    var parents = {
      Father: father,
      Mother: mother,
      Similarity: similarity,
      SkinSimilarity: skin,
    };
    var colors = JSON.parse(hair_or_colors);
    var hair = { Hair: colors[0], Color: colors[1], HighlightColor: colors[2] };

    if (currentGender == 0)
      var clothes = {
        Mask: { Variation: 0, Texture: 0 },
        Gloves: { Variation: 0, Texture: 0 },
        Torso: { Variation: 0, Texture: 0 },
        Leg: { Variation: 0, Texture: 0 },
        Bag: { Variation: 0, Texture: 0 },
        Feet: { Variation: 1, Texture: 0 },
        Accessory: { Variation: 0, Texture: 0 },
        Undershit: { Variation: 15, Texture: 0 },
        Bodyarmor: { Variation: 0, Texture: 0 },
        Decals: { Variation: 0, Texture: 0 },
        Top: { Variation: 1, Texture: 0 },
      };
    else
      var clothes = {
        Mask: { Variation: 0, Texture: 0 },
        Gloves: { Variation: 0, Texture: 0 },
        Torso: { Variation: 5, Texture: 0 },
        Leg: { Variation: 0, Texture: 0 },
        Bag: { Variation: 0, Texture: 0 },
        Feet: { Variation: 3, Texture: 0 },
        Accessory: { Variation: 0, Texture: 0 },
        Undershit: { Variation: 15, Texture: 0 },
        Bodyarmor: { Variation: 0, Texture: 0 },
        Decals: { Variation: 0, Texture: 0 },
        Top: { Variation: 5, Texture: 0 },
      };

    var accessory = {
      Hat: { Variation: -1, Texture: 0 },
      Glasses: { Variation: -1, Texture: 0 },
      Ear: { Variation: -1, Texture: 0 },
      Watches: { Variation: -1, Texture: 0 },
      Bracelets: { Variation: -1, Texture: 0 },
    };
    var tattoos = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [] };
    gm.mysql.handle.query(
      "INSERT INTO `customization` SET gender=?,parents=?,features=?,appearance=?,hair=?,clothes=?,accessory=?,tattoos=?,eyebrowc=?,beardc=?,eyec=?,blushc=?,lipstickc=?,chesthairc=?,iscreated=?,personid=?",
      [
        currentGender,
        JSON.stringify(parents),
        features,
        appearance_values,
        JSON.stringify(hair),
        JSON.stringify(clothes),
        JSON.stringify(accessory),
        JSON.stringify(tattoos),
        JSON.stringify(colors[3]),
        JSON.stringify(colors[4]),
        JSON.stringify(colors[5]),
        JSON.stringify(colors[6]),
        JSON.stringify(colors[7]),
        JSON.stringify(colors[8]),
        1,
        player.data.charid,
      ],
      function (err, res, row) {}
    );
    player.call("DestroyCamera", []); // удаление характера
    player.data.money = 5000;
    player.position = new mp.Vector3(15, 15, 71);
    player.health = 100;
    player.armour = 0;
    player.loggedInAs = player.name;
  },
  charenterAccount: function (player, id) {
    gm.mysql.handle.query(
      "SELECT * FROM customization WHERE id=?",
      [id],
      function (err, custom) {
        if (custom.length) {
          custom.forEach(function (dat) {
            gm.mysql.handle.query(
              "SELECT * FROM characters WHERE id=?",
              [dat.personid],
              function (err, chars) {
                if (chars.length) {
                  chars.forEach(function (playerData) {
                    player.call("DestroyCamera", []); // удаление характера
                    player.name =
                      playerData.firstname + " " + playerData.lastname;
                    player.data.money = playerData.money;
                    player.data.bank = playerData.bank;
                    player.health = playerData.health;
                    player.armour = playerData.armour;
                    player.data.lvl = playerData.lvl;
                    player.data.exp = playerData.exp;
                    player.data.charid = playerData.id;
                    var dats = [
                      {
                        spawn: { x: 15.0, y: 15.0, z: 71.0, r: 0.0 },
                        player: JSON.parse(playerData.xyz),
                      },
                    ];
                    player.call("player:spawn:in", dats);
                  });
                }
              }
            );
          });
        }
      }
    );
  },
  spawnAccount: function (player, pos) {
    let possss = JSON.parse(pos);
    player.position = new mp.Vector3(possss.x, possss.y, possss.z);
    player.heading = possss.r;
  },
};
