const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../src/templates/views')
const partialsPath = path.join(__dirname, '../src/templates/partials')
//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath);
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render("index",{
        title : "Weather App",
        name : "Shubh"
    })
})
app.get('/about',(req,res)=>{
    res.render("about",{
        title:'About Me',
        name : "Shubh"
    })
})
app.get('/help',(req,res)=>{
    res.render("help",{
        helpText : "helpppp",
        title : "HELP",
        name  : "Shubh"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'you must provide an address'
        })
    }
    geocode(req.query.address ,(error ,{latitude ,longitude ,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error ,forecastData)=>
        {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast :forecastData ,
                location ,
                address :req.query.address
            })
        })
    })
    
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
      return  res.send({
        error: 'you must provide a search term'
       })
    }
    console.log(req.query.search)
    res.send({
        products :[]
    })
    

})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Shubh Mishra',
        errorMessage : "HELP article not found!"
    })})

//404 handler
app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Shubh Mishra',
        errorMessage : "Page not found!"
    })

})
app.listen(10000,()=>{
    console.log('server is up on port 10000')
})