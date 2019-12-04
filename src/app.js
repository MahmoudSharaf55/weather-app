const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoLocation = require('./utils/geo_location');
const weather = require('./utils/weather');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views'); // or any folder you need
const partialsPath = path.join(__dirname, '../templates/partials'); // or any folder you need

// setup handlebars engine and views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicPath));
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        creator: 'Ma7MOoOD',
    })
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mahmoud Sharaf',
        creator: 'Mahmoud',
    })
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'I am Helping text',
        creator: 'Mahmoud',
    })
});
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Not found',
        error: 'Helping Article Not Found',
        creator: 'Mahmoud',
    })
});
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }
    geoLocation(req.query.address,(error,{lat,long,place} = {})=>{
        if (error){
            return res.send({
                error: 'Error in location service',
            })
        }
        weather(lat,long,(error,data)=>{
            if (error){
                return res.send({
                    error: 'Error in weather service',
                })
            }
            res.send({
                weather: data.summary + " Temperature is " + data.temperature + "˚ with " + data.rain +"% rain",
                place,
                address: req.query.address,
            })
        })
    })
});
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not found',
        error: 'Page Not Found',
        creator: 'Mahmoud',
    })
});

app.listen(port, () => {
    console.log('Running Server On '+port)
});