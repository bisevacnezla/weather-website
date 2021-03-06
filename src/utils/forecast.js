const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d80c288457a1ca681a985e7024841fb0&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ' It is currently ' + response.body.current.temperature + ' degress out. There is a ' + 
            response.body.current.precip + '% chance of rain. Wind speed is ' + response.body.current.wind_speed + ' and wind degree is ' + response.body.current.wind_speed + ' .')
        }
    })
}

module.exports = forecast