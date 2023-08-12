let moneyhud = mp.browsers.new("package://moneyhud/index.html");
moneyhud.active = false;


let buton = 0;
mp.events.add("spawnmenu:spawn", (type) => {
  if(buton == 1) return;
  buton = 1;
  if(type == 1){
    moneyhud.active = true;
    let active = moneyhud.active;
  }
  if(type == 2){
    moneyhud.active = true;
    let active = moneyhud.active;
  }
  
});