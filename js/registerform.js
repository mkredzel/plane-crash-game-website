//==========================================
// VALIDATION OF USERID, EMAIL, PASSWORD
//==========================================

function validation() {
    
    let userID = document.getElementById("IDinput");
    let email = document.getElementById("emailInput");
    let country = document.getElementById("countryInput");
    let telephone = document.getElementById("telephoneInput");
    let phoneValidation = /^\d{6,12}$/;
    let password = document.getElementById("passwordInput");
    let confirmPassword = document.getElementById("passwordConfirmInput");
    
    if (userID.value == "") {
        document.getElementById("registerFailure").innerHTML = "Please enter your ID.";
        userID.style.border = "2px solid red";
        return false;
        }
    
        userID.style.border = "2px solid black";
    
    if (email.value == "") {
        document.getElementById("registerFailure").innerHTML = "Please enter a valid e-mail address.";
        email.style.border = "2px solid red";
        return false;
        }
    
        email.style.border = "2px solid black";
    
    if (email.value.indexOf("@", 0) < 0) {
        document.getElementById("registerFailure").innerHTML = "Please enter a valid e-mail address.";
        email.style.border = "2px solid red";
        return false;
        }
            
        email.style.border = "2px solid black";
    
    if (email.value.indexOf(".", 0) < 0) {
        document.getElementById("registerFailure").innerHTML = "Please enter a valid e-mail address.";
        email.style.border = "2px solid red";
        return false;
        }
    
        email.style.border = "2px solid black";
    
    if (country.value == "") {
        document.getElementById("registerFailure").innerHTML = "Please enter a valid country.";
        country.style.border = "2px solid red";
        return false;
        }
    
        country.style.border = "2px solid black";
    
    if (!telephone.value.match(phoneValidation)) {
        document.getElementById("registerFailure").innerHTML = "Please enter a valid telephone number.";
        telephone.style.border = "2px solid red";
        return false;
        }
    
        telephone.style.border = "2px solid black";
    
    if (password.value == "") {
        document.getElementById("registerFailure").innerHTML = "Please enter your password.";
        password.style.border = "2px solid red";
        return false;
        }
    
        password.style.border = "2px solid black";
    
    if (password.value != confirmPassword.value) {
        document.getElementById("registerFailure").innerHTML = "Passwords don't match.";
        password.style.border = "2px solid red";
        confirmPassword.style.border = "2px solid red";
        return false;
        }
    
        password.style.border = "2px solid black";
        confirmPassword.style.border = "2px solid black";
    
    if (userAlreadyExists()) {
        document.getElementById("registerFailure").innerHTML = "This user ID is already in use.";
        userID.style.border = "2px solid red";
        return false;
        }
    
    if (emailAlreadyExists()) {
        document.getElementById("registerFailure").innerHTML = "This e-mail is already in use.";  
        email.style.border = "2px solid red";
        return false;
        }
    
    if (!userAlreadyExists() && !emailAlreadyExists()) {
        storeUser();
        window.location.href = "login.php";
        }
}

function userAlreadyExists() {
    
    let userInput = document.getElementById("IDinput").value;  
    users = JSON.parse(localStorage.users);
    
    return users.map(user => user.userID).includes(userInput);
}

function emailAlreadyExists() {
    
    let emailInput = document.getElementById("emailInput").value;
    users = JSON.parse(localStorage.users);
    
    return users.map(user => user.email).includes(emailInput);
}

//==========================================
// STORE USER IN LOCALSTORAGE
//==========================================

function storeUser() {
    
    let userObject = {};
    users = JSON.parse(localStorage.users);
    userObject.userID = document.getElementById("IDinput").value;
    userObject.email = document.getElementById("emailInput").value;
    userObject.country = document.getElementById("countryInput").value;
    userObject.telephone = document.getElementById("telephoneInput").value;
    userObject.password = document.getElementById("passwordInput").value;
    users.push(userObject);
    localStorage.users = JSON.stringify(users);
}

//==========================================
// ENABLE EYE ICON TO SHOW PASSWORD
//==========================================

function showPassword() {
    
    let password = document.getElementById("passwordInput");
    
    if (password.type === "password") {
        password.type = "text";
        registerEye.className="fa fa-eye";
    } else {
        password.type = "password";
        registerEye.className="fa fa-eye-slash";
        }
}

//==========================================
// ENABLE EYE ICON TO SHOW CONFIRM PASSWORD
//==========================================

function showConfirmPassword() {
    
    let password = document.getElementById("passwordConfirmInput");
    
    if (password.type === "password") {
        password.type = "text";
        confirmEye.className="fa fa-eye";
    } else {
        password.type = "password";
        confirmEye.className="fa fa-eye-slash";
        }
}

//==========================================
// LET USER KNOW IF CAPS LOCK IS ON
//==========================================

if (localStorage.loggedInUserID == undefined) {
    
    let passwordInput = document.getElementById("passwordInput");
    let passwordConfirmInput = document.getElementById("passwordConfirmInput");
    
    passwordInput.addEventListener("keyup", function(event) {
        if (event.getModifierState("CapsLock")) {
            document.getElementById("registerFailure").innerHTML = "WARNING! Caps lock is ON"
        } else {
            document.getElementById("registerFailure").innerHTML = "";
            }
        })
    
    passwordConfirmInput.addEventListener("keyup", function(event) {
        if (event.getModifierState("CapsLock")) {
            document.getElementById("registerFailure").innerHTML = "WARNING! Caps lock is ON"
        } else {
            document.getElementById("registerFailure").innerHTML = "";
            }
        })
}     

//==========================================
// ENABLE ENTER KEY IN PASSWORD INPUT FORM
//==========================================

let input = document.getElementById("passwordInput");

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("registerButton").click();
        }
})