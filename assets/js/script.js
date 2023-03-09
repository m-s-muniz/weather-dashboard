//Function to pull the keys from local storage and create buttons
var previousCities;
var cityID;
var data;

function createButtons(){
    //get keys from local storage
    previousCities = Object.keys(localStorage).sort();
    console.log(previousCities);

    //loop through all the keys
    for(var i = 0; i < previousCities.length; i++ ){
        // check if button with key already exists
        var check = document.getElementById(previousCities[i]);
       //  console.log('button check: ' + check);
        // if not, create a button from the key
        if(check === null){
            $('#savedCities').append('<button class="btn btn-secondary btn-block" id="'+previousCities[i]+'" onclick="getWeather(event)">'+previousCities[i]+'</button><br>');
        }
        
    }
}

//Weather data from local storage based on which city button is clicked
function getWeather(event){
    event.preventDefault();
   // console.log(event);
   // console.log(event.target);
   // console.log(event.target.id);
    cityID = event.target.id;
    data = localStorage.getItem(cityID);
    data = JSON.parse(data);
     console.log(data);
     displayWeather(data);

}

//Function to grab value of search field, call API with city name, retrieve data and put into local storage
function searchCity(event){
    event.preventDefault();
    //Get the city from the search input
    city = $('#city').val();
    //console.log(city);

    //Ajax call to the weather API for the city
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast',
        data: {
            //lat:44.34,
            //lon:10.99,
            q: city,
            //zip: 78249,
            units: 'imperial',
            appid: 'cba31ad2823bd810307985e75e94b342',
        },
        dataType: 'json',
        success: function(apiResponse) {
           // console.log(apiResponse);
           // Put data in string form to local storage
            var holdThis = JSON.stringify(apiResponse);
            localStorage.setItem(city, holdThis)
            //pass the data to the display function
            displayWeather(apiResponse);
            //  make new city buttons on as we go
            createButtons();
        }
    });

    //verify data is in the local storage
    if(localStorage.getItem(city) != null){
        var havethis = localStorage.getItem(city);
         console.log('This is the data: ');
        var data = JSON.parse(havethis);
        // console.log(data);
        displayWeather(data);

    }

}

//Get a handle on divs and insert weather data from current data or local stored data
function displayWeather(data){

    //console.log(data);


    //set data list items that needed (noon for each of the 6 days)
    const dayArray = [2,10,18,26,34,39];
    for(i = 0; i < dayArray.length; i++){

         //convert the time and date 
        const timestamp = data.list[dayArray[i]].dt; // timestamp in seconds
        const date = new Date(timestamp * 1000); // changed it to milliseconds
        const month = date.getMonth() + 1; // add 1 to get 1-12 month range
        const day = date.getDate();
        const year = date.getFullYear();
        var formattedDate = `${month}/${day}/${year}`;
        // console.log(formattedDate);

        // get the weather icon data
        var dataSymbol = data.list[dayArray[i]].weather[0].icon;
         // console.log(dataSymbol);        

       // get the weather icon symbol from the weather site and display it
       var daySymbol =  '<figure><image src="https://openweathermap.org/img/wn/'+dataSymbol+'@2x.png"><figurecaption>'+data.list[dayArray[i]].weather[0].description+'</figurecaption></figure>';

       // get the Temp, Wind, and Humidity requested weather data
       var dayTemp = data.list[dayArray[i]].main.temp;
       var dayWind = data.list[dayArray[i]].wind.speed;
       var dayHumid = data.list[dayArray[i]].main.humidity;
      // console.log(dayTemp);

        //get the data into the div tags
      if(i === 0){
        $('#day'+[i]).html('<h2>'+data.city.name+' ('+formattedDate+')</h2><p>'+daySymbol+'</p><p>Temp: '+dayTemp+' °F</p><p>Wind: '+dayWind+' MPH</p><p>Humidity: '+dayHumid+' %</p>');
      }else{
        $('#day'+[i]).html('<h5>'+formattedDate+'</h5><p>'+daySymbol+'</p><p>Temp: '+dayTemp+' °F</p><p>Wind: '+dayWind+' MPH</p><p>Humidity: '+dayHumid+' %</p>');

        }
    }
}

createButtons();
