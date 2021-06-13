const request = require('postman-request')

const forecast = (latitude,longitude,callback)=>{
const uri = 'http://api.weatherstack.com/current?access_key=d6c0527fe72e0b42cc21c7c6c1b4a3df&query='+latitude+','+longitude
request({url: uri, json: true},(error,response,body)=>{
    if(error){
        callback('Connection issues',undefined)
      }else if(response.body.error){
          callback(response.body.error,undefined)
        //console.log(response.body.error.info)
    
      }else{
          callback(undefined,body.current)
         // Print the HTML for the Google homepage.
      }

})
}


module.exports = forecast
