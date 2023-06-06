const request = require('request')
const forecast = (latitude,longitude ,callback)=>{
const url ="https://api.open-meteo.com/v1/forecast?latitude=" + latitude +"&longitude="+longitude +"&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&timezone=Asia%2FBangkok"
request({url : url , json : true},(error,response)=>
{
    if(error){
       callback("unable to connect to weather services",undefined)
    }
    else if(response.body.error){
        callback("unable to find location",undefined)
    }
    else{
       callback(undefined,"today the  temp  is :" + JSON.parse(JSON.stringify(response.body.current_weather.temperature)) + "but it feels like:"+JSON.parse(JSON.stringify(response.body.daily.apparent_temperature_max[0]))
       )
    }

})
}

module.exports = forecast