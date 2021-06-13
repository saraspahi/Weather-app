const request = require('postman-request')


const geocode = (location,callback)=>{
const url = 'https://api.addressy.com/Geocoding/International/Geocode/v1.10/json3.ws?Key=RN29-UT47-HW41-JZ53&Country=USA&Location='+location
request({url:url, json: true},(error,response,body)=>{
   // console.log(error)
    //console.log(response)

    if(!error && !response.body){
        callback('Connection Issues!',undefined)}
    else if(response.body.Items[0].Error){
          callback(response.body.Items[0].Resolution,undefined)
       }
    else{
        callback(undefined,body.Items[0])
        //const latitude= body.Items[0].Latitude
        //const longitude = body.Items[0].Longitude
        
        //console.log('Latitude: ',latitude);
        //console.log('Longitude: ',longitude) 
      }
      
})
}
module.exports = geocode


