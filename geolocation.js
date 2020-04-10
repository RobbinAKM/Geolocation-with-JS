$("#error").hide();
$("#hud").show();

if (navigator.geolocation){
navigator.geolocation.getCurrentPosition(gotLocation);
}else {
displayError("your browser does not support geolocation");
}
function gotLocation(currentPosition) {
  $("#hud").hide();

  var $restaurants = $("span");
  
  $restaurants.each(function(){
    var restaurantLatitude = $(this).data("lat");
    var restaurantLongitude = $(this).data("lon");
    
    var distanceInMiles = calculateDistance(currentPosition.coords.latitude, currentPosition.coords.longitude, restaurantLatitude, restaurantLongitude);
    
    $(this).text(distanceInMiles + " miles");
  });
}

function gotError (error){
  var message ;
  
  switch (error.code){
  case PERMISSION_DENIED:
      message= "You need to turn on the location in your browser";
      break ;
      
  case POSITION_UNAVAILABLE:
      message = "your current position is unavailable .Please try to refresh the page ";
      break;
      
  case TIMEOUT:
      message = "It took too long to find the location .Please try again";
      break;
  
      
  }
displayError(message);

}

function displayError(message) {
  $("#hud").hide();
  $("#error").text(message).slideDown("slow");
}