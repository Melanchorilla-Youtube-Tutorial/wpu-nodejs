const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

require('./utils/db');
const Contact = require('./model/contact');

const app = express();
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');

// Third party middleware
app.use(expressLayouts);

// konfigurasi flash 
app.use(cookieParser('secret'));
app.use(
    session({
        cookie: {maxAge: 6000},
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);
app.use(flash());

// built-in middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('/', (request, response) => {
    const mahasiswa = [
        {
            nama: 'Dicky Kamaludin B',
            email: 'dicky@email.com'
        },
        {
            nama: 'Dick',
            email: 'dick@email.com'
        },
        {
            nama: 'Baba',
            email: 'baba@email.com'
        }

    ];
    response.render('index', {
        layout: 'layouts/main-layout',
        nama: 'Dicky Kamaludin', 
        title: 'Halaman Home', 
        mahasiswa: mahasiswa});
});

app.get('/about', (request, response) => {
    response.render('about', {
        layout: 'layouts/main-layout',
        title: "Halaman About"
    });
});

app.get('/contact', async (request, response) => {

    // Contact.find().then((contact) => {
    //     response.send(contact);
    // })

    const contacts = await Contact.find();

    response.render('contact', {
        layout: 'layouts/main-layout',
        title: "Halaman Contact",
        contacts: contacts,
        msg: request.flash('msg')
    });
});

// halaman detail contact
app.get('/contact/:nama', async (request, response) => {
    const contact = await Contact.findOne({nama: request.params.nama});
    
    response.render('detail', {
        layout: 'layouts/main-layout',
        title: "Halaman Detail Contact",
        contact: contact
    });
});

app.listen(port, () => {
    console.log(`listening at http://localhost:3000`);
})