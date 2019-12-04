const request = require('request');

const geoLocation = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWFobW91ZHNoYXJhZiIsImEiOiJjazM5Y3dmdHUwMHgxM29rMzRkbmR5YW04In0.KyoV1HgKW86l4kP53v86Rg';
    request({url: geoUrl, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        } else if (response.body.features.length === 0) {
            callback('unable to find location', undefined);
        } else {
            const lat = response.body.features[0].center[0];
            const long = response.body.features[0].center[1];
            const name = response.body.features[0].place_name;
            callback(undefined, {
                lat: lat,
                long: long,
                place: name,
            })
        }
    });
};
module.exports = geoLocation;