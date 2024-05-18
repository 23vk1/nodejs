const libExpress = require('express');


const app = libExpress();


// city list
const cities = [
    { name: 'Mumbai', timezone: 'Asia/Kolkata' },
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'London', timezone: 'Europe/London' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' }
];


// function to get time
function getCurrentTime(timezone){
    const now = new Date();
    const options = {
        timeZone:timezone,
        hour12:false,
        hour:'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    return now.toLocaleTimeString('en-US',options);
}

// route
app.get('/worldclock', (req, res) => {
    const times = cities.map(city => ({
        name: city.name,
        time: getCurrentTime(city.timezone)
    }));
    res.json(times);
});

// app listening 
app.listen(3000, ()=>{
    console.log("server started at port 3000  || go to 'http:localhost:3000/worldclock' to see data from different timezone");
})

