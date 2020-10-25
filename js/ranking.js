//==================================================================
// DISPLAY RANKING IN A TABLE #, USER ID, SCORE
//==================================================================

let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
let result = "";
let rank = 1;
  
ranking.forEach(function (item) {
    result += "<tr><td>" + rank++ + "</td><td>" + item.userID + "</td><td>" + item.score + "</td><td>" + item.difficulty + "</td></tr>"
})

document.getElementById("ranking").innerHTML = "<table><tr><th>#</th><th>UserID</th><th>Score</th><th>Difficulty Level</th>" + result + "</table>"