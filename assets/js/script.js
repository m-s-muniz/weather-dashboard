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
    console.log(event);
   // console.log(event.target);
    console.log(event.target.id);
    cityID = event.target.id;
    data = localStorage.getItem(cityID);
    data = JSON.parse(data);
     console.log(data);

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

    }

}



createButtons();
