const libExpress = require('express');

const app = libExpress();

app.get("/",(req, res)=>{
    res.send("hello world");
})

app.listen(3000, ()=>{
    console.log("server is started at port 3000");
})

