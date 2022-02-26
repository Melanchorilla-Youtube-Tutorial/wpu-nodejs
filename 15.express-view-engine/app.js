const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);

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


app.get('/contact', (request, response) => {
    response.render('contact', {
        layout: 'layouts/main-layout',
        title: "Halaman Contact"
    });
});

app.get('/product/:id', (request, response) => {
    response.send(`Product ID : ${request.params.id} <br> Category ID: ${request.query.category}`);
});


app.use('/', (request, response) => {
    response.status(404);
    response.send('<h1>404</h1>')
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

