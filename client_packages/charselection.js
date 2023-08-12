var charselection = mp.browsers.new("package://cef/CharSelection.html");
const funciones = require('./modules')
mp.events.add("open:charselection", () => {


});

var datas = [];
var customization = [];
mp.events.add("but:charselection", (data,data2) => {
  datas.push(data);
  customization.push(data2);
  charselection.execute(`charselection.datas=${JSON.stringify(datas)}`);
  charselection.execute(`charselection.customization=${JSON.stringify(customization)}`);
  charselection.execute(`charselection.createbut('${JSON.stringify(data)}')`);

});

mp.events.add("but2:charselection", () => {
  charselection.execute(`charselection.createbut2()`);
});

mp.events.add("create:charselector", (firstName, lastName) => {
  mp.events.callRemote("create:charselector", firstName,lastName);
});
mp.events.add("create:charselector:save", () => {
  charselection.execute('charselection.active=0');
  localplayer.setAlpha(255);
});

mp.events.add("player:charselection", (id) => {
  for (let i = 0; i < customization.length; i++) {
    if(customization[i].personid == id){
      set_gender(JSON.parse(customization[i].personid));
      mp.events.callRemote("data:id:charselector", customization[i].personid);
      localplayer.setAlpha(255); // показать перса
    }
  }
});

function set_gender(id){
  for (let i = 0; i < customization.length; i++) {
    if(customization[i].personid == id){
      updateGender(customization[i].gender);
      updateCharacterParents(customization[i].parents);
      updateAppearance(customization[i].appearance);
      updateClothes(customization[i].clothes,customization[i].gender);
      updateFeature(customization[i].features);
      updateCharacterHairAndColors(id);
    }
  }
}
mp.events.add("player:enter:server", (id) => {
  mp.events.callRemote("player:enter:server", id);
  funciones.html(false,charselection,null,null);
});

function updateGender(gender) {
  if (gender == 0) {
    localplayer.model = mp.game.joaat('mp_m_freemode_01');
    outClothes = 1;
    pants = 0;
    shoes = 1;
  }else{
    localplayer.model = mp.game.joaat('mp_f_freemode_01');
    outClothes = 5;
    pants = 0;
    shoes = 3;
  }
}
function updateCharacterParents(data) {
  var parents = JSON.parse(data);
  localplayer.setHeadBlendData(
      parents.Mother,parents.Father,0,
      parents.Mother,parents.Father,0,
      parents.Similarity,parents.SkinSimilarity,0.0,true
  );
}
function updateAppearance(dat) {
  var appearance = JSON.parse(dat);
  for (var i = 0; i < 11; i++) localplayer.setHeadOverlay(i, appearance[i].Value, 100, 0, 0); 
}

//{"Mask":{"Variation":0,"Texture":0},"Gloves":{"Variation":0,"Texture":0},"Torso":{"Variation":11,"Texture":0},"Leg":{"Variation":103,"Texture":3},"Bag":{"Variation":0,"Texture":0},"Feet":{"Variation":5,"Texture":2},"Accessory":{"Variation":0,"Texture":0},"Undershit":{"Variation":15,"Texture":0},"Bodyarmor":{"Variation":0,"Texture":0},"Decals":{"Variation":0,"Texture":0},"Top":{"Variation":26,"Texture":4}}

function updateClothes(dat,gender) {
  var clot = JSON.parse(dat);
  localplayer.setComponentVariation(1, clot.Mask.Variation, clot.Mask.Texture, 0);
  localplayer.setComponentVariation(11, clot.Top.Variation, clot.Top.Texture, 0);
  localplayer.setComponentVariation(8, clot.Undershit.Variation, clot.Top.Texture, 0);
  localplayer.setComponentVariation(4, clot.Leg.Variation, clot.Leg.Texture, 0);
  localplayer.setComponentVariation(6, clot.Feet.Variation, clot.Feet.Texture, 0);
  localplayer.setComponentVariation(3, clot.Torso.Variation, 0, 0);


}
function updateFeature(dat) {
  var Feature = JSON.parse(dat);
  for (var b = 0; b < 20; b++) localplayer.setFaceFeature(b, Feature[b]);
}
function updateCharacterHairAndColors(id) {
  for (let i = 0; i < customization.length; i++) {
    if(customization[i].personid == id){
      let currentGender = (JSON.parse(customization[i].gender)) ? 0 : 1;
      // hair
      var hair = JSON.parse(customization[i].hair);
      localplayer.setComponentVariation(2, hairIDList[currentGender][hair.Hair], 0, 0);
      localplayer.setHairColor(hair.Color, 0);
      // appearance colors
      localplayer.setHeadOverlayColor(2, 1, hair.Color, 100); // eyebrow
      localplayer.setHeadOverlayColor(1, 1, hair.Color, 100); // beard
      localplayer.setHeadOverlayColor(10, 1, hair.Color, 100); // chesthair
      // eye color
      localplayer.setEyeColor(JSON.parse(customization[i].eyec));
    }
  }
}