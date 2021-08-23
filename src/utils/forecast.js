const request = require('request')

const forecast = (lat,lon,callback) => {
    const API_KEY = "ed7c752815062871a6efb8e083735331"
    const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    
    const requestConfig = { url, json : true }
    
    request(requestConfig,(error,response) => {
        if(error) callback("Unable to connect",undefined)    
        else if(response.body.message) callback("unable to find location",undefined)
        else {
            callback(undefined,response.body.main.temp)} 
    })
}


module.exports = forecast