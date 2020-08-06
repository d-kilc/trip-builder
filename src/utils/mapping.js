export const geoCodeAddress = (address) => {
    let maps = this.state.mapsApi
    let geocoder = new maps.Geocoder()

    // return a Promise
    return new Promise(function(resolve, reject) {
        geocoder.geocode({ address: address }, function(results, status) {
            // if (status == maps.GeocoderStatus.OK) {
            if (status == 'OK') {
                // resolve results upon a successful status
                resolve(results);
            } else {
                // reject status upon un-successful status
                reject(status);
            }
        });
    });
}

export const mapLocation = (origin, destination) => {
    let maps = this.state.mapsApi
    let directionsService = new maps.DirectionsService()

    // return a Promise
    return new Promise(function(resolve, reject) {
        directionsService.route({
            // origin: segments[idx].cityFrom.location,
            // destination: segments[idx].cityTo.location,
            origin: origin,
            destination: destination,
            travelMode: 'DRIVING'
        }, function(results, status) {
            // if (status == maps.GeocoderStatus.OK) {
            if (status == 'OK') {
                // resolve results upon a successful status
                resolve(results)
            } else {
                // reject status upon un-successful status
                reject(status)
            }
        })
    })
}