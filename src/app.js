const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const viewsPath=path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname, '../templates/partials')

//Setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nezla'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About me',
        name: 'NezlaB'
    })
})


app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help',
        message: 'Help message',
        name: 'Nezla Bisevac'
    })
})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send(error)
            }
            res.send({
                forecast: forecastData,
                location, 
                address: req.query.address
            })
        })
    })

    console.log(req.query.address)
    // res.send({
    //     forecast: '21',
    //     address: req.query.address,
    //     location: 'Sarajevo' 
    // })
})



app.get('/help/*', (req,res)=>{
    res.render('404', {
        title: '404',
        name: 'Nezla Bisevac',
        message: 'Help article not found'
    })
})

app.get('/about/*', (req,res)=>{
    res.render('404', {
        title: '404',
        name: 'Nezla Bisevac',
        message: 'Page not found'
    })
})

app.get('/weather/*', (req,res)=>{
    res.render('404', {
        title: '404',
        name: 'Nezla Bisevac',
        message: 'Page not found'
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search'
            
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.listen(3000, ()=>{
    console.log("Server je na portu 3000")
})