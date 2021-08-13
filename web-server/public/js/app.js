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

const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Testing')
} )