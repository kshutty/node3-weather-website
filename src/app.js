const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const port = process.env.PORT || 3000
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath =path.join(__dirname, '../templates/partials')
// Setup handlebars engine and vies location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// setup static directory to server
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather', 
        name: 'Andrew Mead'
    })
})

app.get('/about',(req, res) =>{
res.render('about',{
    title: 'About me',
    name: 'Andrew Mead'
})
})

app.get('/help', (req, res) =>{
res.render('help',{
    helpText:'this is some helpful text',
    title: 'Help',
    name: 'Andrew Mead'
})
})

app.get('/weather',(req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'must provide location'
        })
    }
      geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) =>{
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })

        })
    })

    
})

app.get('/products', (req,res) =>{
    if(!req.query.search){
        return res.send({
            error: 'Your must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404',{
        title: 'help article not found',
        name: 'andrew Mead',
        errorMessage: 'help article not found'
    })
})

app.get('*', (req,res) =>{
res.render('404',{
    title: '404',
    name: 'Andrew Mead',
    errorMessage: 'Page not found'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})
