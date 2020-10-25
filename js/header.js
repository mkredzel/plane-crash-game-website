//==================================================================
// CREATE LOCAL STORAGE WITH ADMIN USER BY DEFAULT
//==================================================================

if (localStorage["users"] == undefined) {
    localStorage["users"] = JSON.stringify([{userID: "admin", password: "admin"}]);
}

//==================================================================
// HELPER FUNCTION TO APPEND ELEMENT TO EXISTING KEY IN LOCALSTORAGE
//==================================================================

function appendToStorage(name, data){
    
    let old = localStorage.getItem(name);
    
    if (old === null) old = "";
    localStorage.setItem(name, old + data);
}

//==================================================================
// CREATE LOCAL STORAGE FOR EACH RATING
//==================================================================     

if (!localStorage.getItem("1 star") && !localStorage.getItem("2 stars")&& !localStorage.getItem("3 stars") && !localStorage.getItem("4 stars") && !localStorage.getItem("5 stars")){ 
    localStorage.setItem("1 star", "");
    localStorage.setItem("2 stars", "");
    localStorage.setItem("3 stars", "");
    localStorage.setItem("4 stars", "");
    localStorage.setItem("5 stars", "");
}

//==================================================================
// MAKE STOP MOTION ICON CLICKABLE BACK AND FORTH WITH LOCAL STORAGE
//================================================================== 

if (!localStorage.getItem("animationBg")) {
    localStorage.setItem("animationBg", 1);
}

if (localStorage.animationBg == 0) {
    document.body.style.backgroundSize = "100% 100%";
}

document.getElementById("stopMotionIcon").onclick =_=> {
    if (localStorage.animationBg == 1){
        document.body.style.backgroundSize = "100% 100%";
        localStorage.setItem("animationBg", 0);
    } else {
        document.body.style.backgroundSize = "200% 100%";
        localStorage.setItem("animationBg", 1);
        }
}