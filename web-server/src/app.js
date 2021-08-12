const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utilis/goecode');
const forecast = require('./utilis/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handle bars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('', (req, resp) => {
    resp.render('index', {
        title: 'Weather',
        name: 'Johnnie'
    });
})

app.get('/about', (req, resp) => {
    resp.render('about', {
        title: 'About',
        name: 'Johnnie'
    });
})

app.get('/help', (req, resp) => {
    resp.render('help', {
        title: 'Help',
        name: 'Johnnie'
    });
})

app.get('/weather', (req, resp) => {
    if(!req.query.address){
        return resp.send({
            error: "You must provide and address!"
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location}) => {
        if(error){
            return resp.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return resp.send({ error})
            }
        })
    })

    // resp.send({
    //     forecast: 'It is snowing!',
    //     location: 'New York',
    //     address: req.query.address
    // });
})

app.get('/products', (req, resp) => {
    if(!req.query.search){
        return resp.send({
            error: 'You mus provide a search term!'
        })
    }
    console.log(req.query.search)
    resp.send({
        products: []
    })
})

app.get('/help/*', (req, resp) => {
    resp.render('404', {
        errorMessage: "Help article not found!"
    })
})

app.get('*', (req, resp) => {
    resp.render('404', {
        errorMessage: "Page not Found"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})
