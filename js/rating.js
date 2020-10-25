//==========================================      
// DISPLAY THE GOOGLE CHART AND STYLE IT
//==========================================

let options = {title:"Game Rating", width:450, height:450, backgroundColor: {fill:"transparent"}, is3D: true, fontSize: 16, titleTextStyle: {color: "black" ,fontSize: 24}};
google.charts.load("current", {"packages":["corechart"]});
google.charts.setOnLoadCallback(drawChart);

//==========================================       
// DRAW THE CHART DEPENDING ON THE RATING
//==========================================

function drawChart($x){

let chart = new google.visualization.PieChart(document.getElementById("piechart"));
    
    if($x == 1){    
        appendToStorage("1 star", document.getElementById("rating-1").value);
        let data = google.visualization.arrayToDataTable([
            ["Stars", "Rating"],
            ["1 star", localStorage.getItem("1 star").length],
            ["2 stars", localStorage.getItem("2 stars").length],
            ["3 stars", localStorage.getItem("3 stars").length],
            ["4 stars", localStorage.getItem("4 stars").length],
            ["5 stars", localStorage.getItem("5 stars").length]
            ]); 
        document.getElementById("feedbackResult").innerHTML = "I am sorry you did not like my game. <br> Feel free to use e-mail address below to give me feedback";
        chart.draw(data, options);
    } else if ($x == 2){   
        appendToStorage("2 stars", document.getElementById("rating-2").value);
        let data = google.visualization.arrayToDataTable([
            ["Stars", "Rating"],
            ["1 star", localStorage.getItem("1 star").length],
            ["2 stars", localStorage.getItem("2 stars").length],
            ["3 stars", localStorage.getItem("3 stars").length],
            ["4 stars", localStorage.getItem("4 stars").length],
            ["5 stars", localStorage.getItem("5 stars").length]
            ]); 
        document.getElementById("feedbackResult").innerHTML = "I am sorry you did not like my game. <br> Feel free to use e-mail address below to give me feedback";
        chart.draw(data, options);
        
    } else if ($x == 3){    
        appendToStorage("3 stars", document.getElementById("rating-3").value);
        let data = google.visualization.arrayToDataTable([
            ["Stars", "Rating"],
            ["1 star", localStorage.getItem("1 star").length],
            ["2 stars", localStorage.getItem("2 stars").length],
            ["3 stars", localStorage.getItem("3 stars").length],
            ["4 stars", localStorage.getItem("4 stars").length],
            ["5 stars", localStorage.getItem("5 stars").length]
            ]); 
        document.getElementById("feedbackResult").innerHTML = "Thank you for rating the game 3 stars";
        chart.draw(data, options);
        
    } else if ($x == 4){       
        appendToStorage("4 stars", document.getElementById("rating-4").value);
        let data = google.visualization.arrayToDataTable([
            ["Stars", "Rating"],
            ["1 star", localStorage.getItem("1 star").length],
            ["2 stars", localStorage.getItem("2 stars").length],
            ["3 stars", localStorage.getItem("3 stars").length],
            ["4 stars", localStorage.getItem("4 stars").length],
            ["5 stars", localStorage.getItem("5 stars").length]
            ]); 
        document.getElementById("feedbackResult").innerHTML = "Thank you for rating the game 4 stars";
        chart.draw(data, options);
        
    } else if ($x == 5){  
        appendToStorage("5 stars", document.getElementById("rating-5").value);
        let data = google.visualization.arrayToDataTable([
            ["Stars", "Rating"],
            ["1 star", localStorage.getItem("1 star").length],
            ["2 stars", localStorage.getItem("2 stars").length],
            ["3 stars", localStorage.getItem("3 stars").length],
            ["4 stars", localStorage.getItem("4 stars").length],
            ["5 stars", localStorage.getItem("5 stars").length]
            ]); 
        document.getElementById("feedbackResult").innerHTML = "Thank you for rating the game 5 stars";
        chart.draw(data, options);
    }
}