const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = (path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App', 
        name: 'Hugh Turner'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me', 
        name: 'Hugh Turner'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page', 
        message: 'This is my dynamic express web application', 
        name: 'Hugh Turner'
    })
})

app.get('/Weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => { 
        if (error){
            return res.send ({ error })
        }

        forecast( latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send ({ error })
            }
    
            res.send({
                forecast: forecastData,
                location: location, 
                address: req.query.address
            })
        })
    })
})

// app.get('/Weather', (req, res) => {
//     res.send({
//         forecast: 'It is cold outside at 30 degrees f',
//         location: 'Boston'
//     })
// })

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help artical not found',
        name: 'Hugh Turner'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found.',
        name: 'Hugh Turner'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})