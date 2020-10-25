//===========================================================
// LOGIN FUNCTION CHECKS IF CREDENTIALS ARE CORRECT
//===========================================================

function login() {
    let userInput = document.getElementById("IDinput").value;
    let passInput = document.getElementById("passwordInput").value;
    let text = document.getElementById("loginFailure");
    let validUser = false;
    
    JSON.parse(localStorage.users).forEach(function(user) {
        if (!validUser && user.userID == userInput && user.password == passInput) {
            validUser = true;
        }
    });
    
    if (validUser) {
        document.getElementById("loginFailure").innerHTML = "";
        text.style.display = "block";
        localStorage.loggedInUserID = userInput;
        checkLogin();
        removeRegister();
        changeNav(1);
    } else {
        document.getElementById("loginFailure").innerHTML = "User ID and password combination is incorrect.<br>Please try again.";
        text.style.display = "block";
    }
}

//===========================================================
// LOG OUT FUNCTION FOR EVERY USER
//===========================================================

function logout() {
    localStorage.removeItem("loggedInUserID");
    window.location.href = "login.php";
}

//===========================================================
// CLEAR RANKING FUNCTION FOR ADMIN USER ONLY
//===========================================================

function clearRanking() {
    localStorage.removeItem("ranking")
}

//===========================================================
// CLEAR RATING FUNCTION FOR ADMIN USER ONLY
//===========================================================

function clearRating() {
    localStorage.removeItem("1 star");
    localStorage.removeItem("2 stars");
    localStorage.removeItem("3 stars");
    localStorage.removeItem("4 stars");
    localStorage.removeItem("5 stars");
}

//===========================================================
// LET USER KNOW IF CAPS LOCK IS ON
//===========================================================

if (localStorage.loggedInUserID == undefined) {
    
    let input = document.getElementById("passwordInput");
    let text = document.getElementById("loginFailure");
    
    input.addEventListener("keyup", function(event) {

        if (event.getModifierState("CapsLock")) {
            document.getElementById("loginFailure").innerHTML = "WARNING! Caps lock is ON";
            text.style.display = "block";
        } else {
            text.style.display = "none"
        }
    })
}

//===========================================================
// ENABLE EYE ICON TO SHOW PASSWORD
//===========================================================

function showPassword() {
    
    let x = document.getElementById("passwordInput");
    
    if (x.type === "password") {
        x.type = "text";
        loginEye.className="fa fa-eye";
    } else {
        x.type = "password";
        loginEye.className="fa fa-eye-slash";
    }  
}

//===========================================================
// ENABLE ENTER KEY IN PASSWORD INPUT FORM
//===========================================================

if (localStorage.loggedInUserID == undefined) {
    
    let input = document.getElementById("passwordInput");
    
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("loginButton").click();
        }
    })
}

//===========================================================
// CHECK IF ANYONE IS LOGGED IN AND DISPLAY RELEVANT OUTPUT
//===========================================================

checkLogin(); 
    
function checkLogin() {
    
    let loggedInUser = localStorage.loggedInUserID;
    
    if (localStorage.loggedInUserID == "admin") {
        
        document.getElementById("loginForms").innerHTML = "";
        loginEye.className="";
    
        document.getElementById("loggedInUser").innerHTML = `Welcome ${loggedInUser}
        <div id="logoutButton">
            <button onclick="logout()"><b>Log Out</b>
        </button></div>
        
        <div id="clearRankingButton">
            <button onclick="clearRanking()"><b>Clear Ranking</b>
        </button></div>
        
        <div id="clearRatingButton">
            <button onclick="clearRating()"><b>Clear Rating</b>
        </button></div>`;
    } else if (localStorage.loggedInUserID != undefined) {
        document.getElementById("loginForms").innerHTML = "" 
        loginEye.className="";
        removeRegister();
        changeNav(1);
        document.getElementById("loggedInUser").innerHTML = `Welcome ${loggedInUser}
            
        <div id="logoutButton">
            <button onclick="logout()"><b>Log Out</b>
        </button></div>`;
    }
}