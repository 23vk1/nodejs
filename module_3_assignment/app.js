const libExpress = require('express');
const http = require('http');
const app = libExpress();

const cities = ['New York', 'Los Angeles', 'London', 'Paris', 'Tokyo', 'Sydney'];

app.set('view engine','pug');
app.use(libExpress.static('public'));
app.get('/',(req, res)=>{
    res.render('index',{cities});
})

app.get('/weather', async(req, res)=>{
    try{
        const city = req.query.city;
        const apiKey = '6d31e2164de932dc44517fa3bf08a1fe'
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        http.get(url, (response)=>{
            let data = '';
            response.on('data', (chunk)=>{
                data += chunk;
            });
            response.on('end',()=>{
                const weatherData = JSON.parse(data);
                res.render('weather',{weatherData});
            });
        }).on('error',(error)=>{
            res.render('error',{error : "Error Fetching Weather Data"});
        });
    }
    catch(error){
        res.render('error',{error : "Error fetchcing weather data"});
    }
});










app.listen(3001,()=>{
    console.log("server is started at port 3001");
})
