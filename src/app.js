const hbs = require('hbs')
const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast  = require('./utils/forecast')

const port = process.env.PORT || 3000

const app = express()

// set up paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirPath))

// setup routes
app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Poojan Bhatt'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About me',
        name : 'Poojan Bhatt' 
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help',
        message : 'This is help page' 
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({ error : 'Please add Address' })
    }
    geocode(req.query.address,(error,data) => {
        if(error) return res.send({ error })
        forecast(data.latitude,data.longitude,(error,temp)=>{
            if(error) res.send({ error })
            res.send({
                forecast : 'It is snowing',
                address : req.query.address,
                temperature : temp 
            })
        })
    })
    
})
app.get('/help/*',(req,res) => {
    res.render('404',{
        title : '404',
        name : 'Poojan Bhatt', 
        errorMessage : 'Help article not found'
    })
})
app.get('*',(req,res) => {
    res.render('404',{
        errorMessage : 'My 404 page'
    })
})

app.listen(port,()=>{
    console.log("Server is up on "+ port  +" port.")
})