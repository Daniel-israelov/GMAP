function navigate() {
    let start;//user current location (Latitude, Longitude)

    /* --->> Getting user location <<--- */
    getLocation();
    function getLocation() {
        //Function to get user coordinates
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates);
        }
        else {
            return null;
        }
    }

    function getCoordinates(position) {
        start = (position.coords.latitude + ',' + position.coords.longitude).toString();
    }
    /* ---------------------------------------------------------------------------------------- */

    /* Setting route on Google maps */
    setTimeout(() => {
        const dest_lat = location.toString().split("/")[5];
        const dest_long = location.toString().split("/")[6];
        const end = dest_lat + ',' + dest_long;

        let maps_url = "https://www.google.co.il/maps/dir/" + start + "/" + end;
        window.open(maps_url, "_blank");

    }, 700);
}
