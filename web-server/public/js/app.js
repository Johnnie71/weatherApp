console.log('Client side javascript file is loaded');

fetch("http://localhost:3000/weather?address=!@")
.then(response => response.json())
.then(data => {
    if(data.error){
       return console.log(data.error)
    } else {
        console.log(data.location);
        console.group(data.forecast)
    }
})

//Getting the form and its input
const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');

//getting the p tags to hold the information after fetch
const locationDetails = document.querySelector('.locationDetails');
const weatherDetails = document.querySelector('.weatherDetails');

//Listening for a submit on the form and getting the value to fetch
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchElement.value;

    locationDetails.textContent = 'LOADING...';
    weatherDetails.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`)
    .then(response => response.json())
    .then(data => {
        if(data.error){
            locationDetails.textContent = data.error
        } else {
            locationDetails.textContent = data.location;
            weatherDetails.textContent = data.forecast;
        }
    })
    
} )