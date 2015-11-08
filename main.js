//MyWidget Script
/**************************
Add a link for a CSS file that styles .mywidget
Add a script tag that points to CDN version of jQuery 1.*
Add a script tag that loads your script file from http://m.edumedia.ca/
**************************/
var scriptsLoaded = 0;



document.addEventListener("DOMContentLoaded", function () {

    //var date = new Date();

    var css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("href", "main.css");
    //loads the CSS file and applies it to the page
    css.addEventListener("load", loadCount);
    document.querySelector("head").appendChild(css);

    var jq = document.createElement("script");
    jq.addEventListener("load", loadCount);
    jq.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js");
    document.querySelector("head").appendChild(jq);


});

function buildWidget(cls) {
    var forecastKey = "dba959995908e6370cd7a86358a716e5";
    var lat = "45.348391";
    var long = "-75.757045";
    var url = "https://api.forecast.io/forecast/" + forecastKey + "/" + lat + "," + long + "?units=ca";

    //now do the ajax call then build your page
    $.ajax({

        type: "GET",
        url: url,
        dataType: "jsonp"
    }).done(function (response) {
        // var weatherForecast = $(".weather-forecast");
        // var widget = $(".mywidget");
        //  var date = new Date(1000*response.hourly.data[0].time);
        // var i = date.getHours;
        console.log(response);
        console.log("this loads");
        showData(response);



        // $.each(response.hourly.data, showData);
        //  $("<li>").text(date.getHours() + ":00").appendTo(widget);
        //  $("<li>").text(date.getHours() + 1 + ":00" + "      " + response.hourly.data[0].windSpeed).appendTo(widget);
        // $("<li>").text(date.getHours() + 2 + ":00" + "      " + response.hourly.data[1].humidity).appendTo(widget);
        // $("<li>").text(date.getHours() + 3 + ":00" + "      " + response.hourly.data[2].temperature).appendTo(widget);
        // $("<li>").text(date.getHours() + 4 + ":00" ).appendTo(widget);
        // $("<li>").text(date.getHours() + 5 + ":00" ).appendTo(widget);
        // $("<li>").text(date.getHours() + 6 + ":00" ).appendTo(widget);
        // $("<li>").text(date.getHours() + 7 + ":00" ).appendTo(widget);
        // $("<li>").text(date.getHours() + 8 + ":00" ).appendTo(widget);
        // $("<p>").text("please work").appendTo()

    });

}

function showData(response) {
    var weatherForecast = $(".weather-forecast")
    var widget = $(".mywidget");
    var newTable = $("<table>");
    var date = new Date(1000 * response.currently.time);
    var hourCount = 24 - date.getHours();
    var i = 0;

    //  $("<li>").text(date.getHours() + ":00");
    $("<p>").text("Current conditions for today, " + parseInt(date.getDay() + 1) + "/" + parseInt(date.getMonth() + 1)).appendTo(weatherForecast);
    $("<p>").text("Temperature:" + response.hourly.data[0].temperature + " C").appendTo(weatherForecast);
    $("<p>").text(response.hourly.data[0].summary).appendTo(weatherForecast);
    newTable.appendTo("body");
    for (i = 0; i < hourCount; i++) {

        // $.each(response.hourly.data, function(index, value){
        var newRow = $("<tr>")
        var newDate = new Date(1000 * response.hourly.data[i].time)
        newRow.appendTo(newTable);
        //newTable.appendTo("body");

        $("<td>").text(newDate.getHours() + ":00").appendTo(newRow);
        $("<td>").text(response.hourly.data[i].humidity).appendTo(newRow);
        $("<td>").text(response.hourly.data[i].cloudCover).appendTo(newRow);
        $("<td>").text(response.hourly.data[i].apparentTemperature).appendTo(newRow);
        $("<td>").text(response.hourly.data[i].windSpeed).appendTo(newRow);
        $("<td>").text(response.hourly.data[i].icon).appendTo(newRow);
        $("<td>").addClass(response.hourly.data[i].icon).appendTo(newRow);
        $("<td>").text(response.hourly.data[i].summary).appendTo(newRow);



        //})

    }


}


function loadCount() {
    scriptsLoaded++;
    if (scriptsLoaded === 2) {
        //call the function in My widget script to load the JSON and build the widget
        buildWidget(".mywidget");
        console.log("both scripts loaded");
    }

}