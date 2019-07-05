const request = require('request')

const forecast = (latitude, longitude, callback) =>{
   const url = `https://api.darksky.net/forecast/aa21f9bd07426b358f9437e6193feb15/${latitude},${longitude}`
   request({ url, json: true}, (error,{body}) =>{
    if(error){
        callback('unable to connect to weather services', undefined)
    }else if (body.error){
        callback('unable to fetch the location entered')
    }else {
        callback(undefined,
            `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. The high for today is ${body.daily.data[0].temperatureHigh} degrees and the low is ${body.daily.data[0].temperatureLow} degrees. There is a ${body.currently.precipProbability}% chance of rain`
         )
    }
   })
}
module.exports = forecast