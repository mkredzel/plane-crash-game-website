//=============================================================================
// CHANGE "LOGIN" TO "MY PROFILE"  AND REMOVE "REGISTER" IF USER IS LOGGED IN
//=============================================================================

if (localStorage.loggedInUserID !== undefined) {
    changeNav(2); removeRegister()
}
        
function changeNav(x){
    document.querySelectorAll("li a")[x].innerHTML = "My profile";
}

function removeRegister(){
    document.getElementById("reg").innerHTML = "";
}