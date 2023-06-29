const path=require('path')
const hbs=require('hbs')
const express=require('express')
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

// const geocode=require('../../weather-app/utils/geocode')


const app=express()
const port=process.env.PORT || 3000
const location=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views', viewPath);
hbs.registerPartials(partialsPath)
// app.set('public',path.join(__dirname,'../public'))
// const locate=path.join(__dirname,'../views')
app.use(express.static(location))
// app.use(express.static(locate))

// app.use(express.static(location))

app.get('',(req,res)=>{
    res.send('Hello Express!')
})
app.get('/help',(req ,res)=>{
    res.render('help',{
        message1: 'Myself Prakhar i am here for your help',
        title: 'help'
    })
    // res.send('<h1>about this page</h1>')


})
app.get('/about',(req,res)=>{
    res.send('<h1>about this page</h1>')
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            msg: 'Please enter the address'
        })
    }
   
        geocode.geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({
                 msg:error
                })
         
            } 
           
             forecast.forecast(latitude,longitude,(error,foredata)=>{
                 if(error){
                     return res.send({
                         msg:error
                     })
                 }
                //  console.log(location)
                //  console.log(foredata)
                res.send({
                    location,
                    forecast:foredata
                })
             })
         })
    // })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        msg: 'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        msg: 'Page not found'
    })
})
app.listen(port,()=>{
    console.log('This website is on port '+port)
})