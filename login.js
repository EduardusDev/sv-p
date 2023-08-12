var loginBrowser;
mp.events.add("player:join", () => {
    loginBrowser = mp.browsers.new("package://cef/Auth.html");
    setTimeout(() => {browser(true);}, 1);
});

mp.events.add("loginDataToServer", (user, pass, state) => {
    mp.events.callRemote("sendDataToServer", user, pass, state);
});

mp.events.add("loginHandler", (handle) => {
    switch(handle){
        case "success":{
            loginBrowser.destroy();
            browser(false);
            mp.gui.chat.push("Login successful");
            break;
        }
        case "registered":{
            loginBrowser.destroy();
            //browser(false);
            mp.gui.chat.push("Registration successful");
            break;
        }
        case "incorrectinfo":{
            loginBrowser.execute(`$(".incorrect-info").show(); $("#loginBtn").show();`);
            break;
        }
        case "takeninfo":{
            loginBrowser.execute(`$(".taken-info").show(); $("#registerBtn").show();`);
            break;
        }
        case "tooshort":{
            loginBrowser.execute(`$(".short-info").show(); $("#registerBtn").show();`);
            break;
        }
        case "logged":{
            loginBrowser.execute(`$(".logged").show(); $("#loginBtn").show();`);
            break;
        }
        default:{
            break;
        }
    }
});