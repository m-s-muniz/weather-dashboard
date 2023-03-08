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
        //check if button with key already exists
        var check = document.getElementById(previousCities[i]);
        console.log('button check: ' + check);
        //if not, create a button from the key
        if(check === null){
            $('#savedCities').append('<button class="btn btn-secondary btn-block" id="'+previousCities[i]+'" onclick="getWeather(event)">'+previousCities[i]+'</button><br>');
        }
        
    }
}

createButtons();
