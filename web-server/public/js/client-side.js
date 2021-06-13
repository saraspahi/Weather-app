console.log('client side javascript file loaded')

//using fetch api to fetch json data form the client side 
//fetch the data form an url


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')//selects the element you want to work with
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')
messageOne.textContent= 'Loading message'
messageTwo.textContent= 'Loading message'

weatherForm.addEventListener('submit',(e)=>{
    console.log('When the form is submitted')
    e.preventDefault()
    const location = search.value
    console.log(location)
    const  url = 'http://localhost:3000/weather?location=' + search.value

fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent= data.error
            messageTwo.textContent= data.error
        }
        else{
            messageOne.textContent= data.Temperature + " degree Celsius"
            messageTwo.textContent= data.Weather
        }
       
    })
})
})
//Using location to create the url where json data is submitted
