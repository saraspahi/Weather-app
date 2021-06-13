const express = require('express')
const path = require('path');
const hbs = require('hbs')
const request = require('postman-request')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
//fix the exclamation error

//express is actually a function
const app = express()

//app.com
//app.com/help
//app.com/about
//Will start up at the root url
//defalut landing page 
// A real sres.send will either take as a parameter a html file to render the page or an object will 
//Will automatically get stringified as json and showed in the webserver

//COMMENTED CODE IS FOR STATIC ASSETS/WEBPAGE
 const directoryPath = path.join(__dirname,'../public')//Modifies the directoryPath to what we need
 //app.use(express.static(directoryPath))//Serves the whole folder just change route path in local host 
//console.log(__dirname)


//Define the paths for express config
//console.log(__dirname)
const newViews = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
console.log(partialsPath)

//Sets up views is express to handle hbs
//express is going to look into a views folder in te root directory; that can be customized as below
//set up handlebars engine and views location

app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//views is pointing to templates folder and the pages will be rendered
app.set('views',newViews)
app.use(express.static(directoryPath))
app.get('/',(req,res)=>
{
    res.render('index.hbs',{
        title: 'Weather app',
        name: 'Sara Spahi'
    })
})

app.get('/about',(req,res)=>
{
    res.render('about.hbs',{
        title: 'About page',
        Name: 'Sara',
        Surname: 'Spahi'
    })
})
app.get('/help',(req,res)=>
{
    res.render('help.hbs',{
        title: 'Help page',
        text: 'This is some useful text'
    })
})


// app.get('/', function(req, res) {
//     res.sendFile(path.join(newPath, '/index.html'));
//   });
  
// //we will provide a route
// app.get('/help',(req,res)=>{
//     res.send('Hello help page')
// })
// //Support a route for about page 
// app.get('/about',(req,res)=>{
//     res.send('Hello about page')
// })
//Suports a route for weather page
app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send({
            error: 'Please provide a location!'
        })

    }

    //Provide the function the res.query.location data so that it return the location and the forecast
    geocode(req.query.location,(error,{Name,Latitude,Longitude} = {})=>{
        if(error)
        {
          res.send({
              error: 'error'
          })
        }
        forecast(Latitude,Longitude,(error,forecastData)=>{
            if(error)
            {
              res.send({
                  errori: 'error'
              })
            }
            res.send({
                location: Name,
                Weather: forecastData.weather_descriptions[0],
                Temperature: forecastData.temperature
            })
          console.log('Location: ', Name)
          console.log('Weather: ' + forecastData.weather_descriptions+ ', Temperature: '+ forecastData.temperature)
        }
        )
      
      })
    
    //console.log(req.query)

})

app.get('*',(req,res)=>{
    res.send('Error 404')
})

app.listen(3000,()=>
console.log('server is up at port 3000'))

