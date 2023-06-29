
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message11=document.querySelector('.city')
const message22=document.querySelector('.temp')
const message33=document.querySelector('.des')
const message44=document.querySelector('.humidity')
const message55=document.querySelector('.windSpeed')


document.querySelector(".btn").addEventListener('click',(e)=>{
    e.preventDefault()
    const location=search.value
    message11.textContent='Loading...'
    message22.textContent=''
    fetch('/weather?address='+ encodeURIComponent(location)).then((response)=>{
    response.json().then((data) => {
        if(data.msg){
            // console.log(data.msg)
            message11.textContent=data.msg
            message22.textContent= INVALID
            message33.textContent= INVALID
            message44.textContent= INVALID
            message55.textContent= INVALID
        }
        else{
            message11.textContent=data.location
            message22.textContent= data.forecast.temperature + "°C"
            message33.textContent= data.forecast.description
            message44.textContent= 'humidity -> ' + data.forecast.humidity + '%'
            message55.textContent= 'wind speed -> ' + data.forecast.windSpeed + 'km/h'

            document.querySelector('.icon').src=data.forecast.image;
            // console.log(data.location)
            // console.log("temperature is " + data.forecast.temperature)
        }
        
    
    })
    
})
    // console.log('testing')
})