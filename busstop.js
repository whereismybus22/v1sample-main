let map, marker;

window.initMap = function () {
  const defaultLocation = { lat: 17.595560486555936, lng: 78.44155068045532 }; 
  map = new google.maps.Map(document.getElementById("map"), {
    center: defaultLocation,
    zoom: 15,
  });
  
  marker = new google.maps.Marker({
    position: defaultLocation,
    map: map,
    draggable: true,
    icon: {
        url: "../assets/images/AppLogo.png", 
        scaledSize: new google.maps.Size(32, 32), 
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 32) 
      }
  });

  // Autocomplete search
  const input = document.getElementById("search-input");
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) return;

    const loc = place.geometry.location;
    map.setCenter(loc);
    marker.setPosition(loc);
  });

  document.getElementById("save-btn").addEventListener("click", () => {
    const pos = marker.getPosition();
    const location = {
        latitude: pos.lat(),
        longitude: pos.lng()
      };
      localStorage.setItem("bus_stop_location", JSON.stringify(location));
  });

  document.getElementById("cancel-btn").addEventListener("click", () => {
    marker.setPosition(defaultLocation);
    map.setCenter(defaultLocation);
  });
};

// Callback when Google Maps loads
window.addEventListener("load", () => {
  if (typeof google !== "undefined") {
    initMap();
  }
});
