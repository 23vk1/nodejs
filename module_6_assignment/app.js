const libExpress = require('express');
const libPath = require('path');
require('dotenv').config();
const bcrypt = require('bcrypt');
const {User,SessionSch} = require('./utils')
const session = require('express-session');
const jwt = require('jsonwebtoken');
const GenerateSessionId = require('./GenerateSessionId');

const app = libExpress();

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
}))


app.set('view engine', 'pug');
app.set('views', libPath.join(__dirname, 'views'));

app.use(libExpress.static('public'));
app.use(libExpress.urlencoded({ extended: true }))




app.get("/register", (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.redirect('home');
    }
    catch (err) {
        res.status(500).send('Error registering user');
    }
});



app.get('/', async (req, res) => {
    const id = req.session.sessionId;
    const existingSession = await  SessionSch.findOne({sessionId: id})
    if (!existingSession) {
        res.render("login");
    }
    else {
        res.redirect('home');
    }
})

app.get('/login',async (req, res) => {
    const id = req.session.sessionId;
    const existingSession = await  SessionSch.findOne({sessionId: id})
    if (!existingSession) {
        res.render("login");
    }
    else {
        res.redirect('home');
    }
})


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.render('login', { error: "User Not Found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.render('login', { error: "invalid credential" });
        }

        const token = jwt.sign({ email: email }, process.env.JWT_KEY);
        const sessionId = GenerateSessionId(user)
        req.session.sessionId = sessionId;
        req.session.email = email;
        req.session.token = token;
        
        const newSession = new SessionSch({email,sessionId})
        await newSession.save();
        res.redirect('home');

    } catch (err) {
        res.render('login', { error: "Error Logging in User" });
    }
});

app.get('/home',async (req, res) => {
    const id = req.session.sessionId;
    const existingSession = await  SessionSch.findOne({sessionId: id})

    if (!existingSession) {
        res.redirect("login");
    }
    else {
        res.render('home');
    }
})




app.get('/logout',async (req, res) => {
    
    try{
        const id = req.session.sessionId
        const data = await SessionSch.deleteOne({sessionId: id})
        req.session.destroy((err) => {
            if (err) {
                console.log("error destroying sesdsion");
                res.status(500)
            }
            else {
                res.redirect('login');
            }
        })
    }catch(err){
        console.log(err);
        res.status(500);
    }

})

app.get('/logout-all',async (req, res) => {  
    const email = req.session.email;
    console.log(email);
    try{
        const id = req.session.sessionId
        const data = await SessionSch.deleteMany({email})
        req.session.destroy((err) => {
            if (err) {
                console.log("error destroying sesdsion");
                res.status(500)
            }
            else {
                console.log("logged out from all devices");
                res.redirect('login');
            }
        })
    }catch(err){
        console.log(err);
        res.status(500);
    }

})







app.listen(3000, () => {
    console.log("server started at post 3000");
})
