const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=aba1052943271804085b6634a5094b7e&query=' + lat + ',' + long + '&units=f'

    request({ url, json: true}, (error, { body } = {}) => {


        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error){
            callback('Unable to find location', undefined)
        }
        else {
            // const { body } = response;
            const currentWeather = body.current
            callback(undefined, currentWeather.weather_descriptions[0] + ". It is currently " + currentWeather.temperature + " degrees out. It feels like " + currentWeather.feelslike + " degrees out.")
        }
    }) 
}

module.exports = forecast