const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'  + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGh1Z2gwNiIsImEiOiJja2lnbGUwd2wwZXhzMnJzNW9oemVxbXlvIn0.RxoTaif30_enhctTbf22-w&limit=1'

    request({ url, json: true }, (error, { body } = {}) => {
    
    
        if(error){
            callback('Unable to connect to location services.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try again with different search term.', undefined)
        } else {

            // const { body } = response;

            callback(undefined, {
                latitude: body.features[0].center[1], 
                longitude: body.features[0].center[0], 
                location: body.features[0].place_name
            })
        }
    })
}

//module.export = geocode

module.exports = geocode
