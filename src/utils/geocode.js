const request = require('request')
const geocode = (address,callback)=>
{
const  url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoia2FueWV3ZXN0MDA5IiwiYSI6ImNsZmZmNXpxMjAwcXUzcHBsYW9zcnYweWkifQ.6Lqbe5ps3Yzm79mG-OLjag"
request({url :url,json :true},(error,response)=>{
    if(error){
       callback('unable to connect to location services',undefined) 
    }
    else if(response.body.features.length ===0){
        callback('unable to find location,try another search',undefined)
    }
    else{
        callback(undefined,{
             latitude : response.body.features[0].center[0],
              longitude : response.body.features[0].center[1],
              location: response.body .features[0].place_name
            })
    }
})
}

module.exports =geocode