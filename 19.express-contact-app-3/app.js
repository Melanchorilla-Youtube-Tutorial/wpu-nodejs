const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {body, validationResult, check} = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const {loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts} = require('./utils/contacts');

const app = express();
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');

// Third party middleware
app.use(expressLayouts);

// built-in middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

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
    const contacts = loadContact();

    response.render('contact', {
        layout: 'layouts/main-layout',
        title: "Halaman Contact",
        contacts: contacts,
        msg: request.flash('msg')
    });
});

// halaman form tambah data contact
app.get('/contact/add', (request, response) => {
    response.render('add-contact', {
        layout: 'layouts/main-layout',
        title: 'Form Tambah Data Contact',
    });
});

// proses data contact
app.post('/contact',
    [
        body('nama').custom((value) => {
            const duplikat = cekDuplikat(value);
            if(duplikat) {
                throw new Error('Nama contact sudah digunakan!');
            }
            return true;
        }),
        check('email', 'E-mail tidak valid!').isEmail(),
        check('noHP', 'No. HP tidak valid!').isMobilePhone('id-ID')
    ],
    (request, response) => {
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            // return respose.status(400).json({errors: errors.array()});
            response.render('add-contact', {
                title: 'Form Tambah Data Contact',
                layout: 'layouts/main-layout',
                errors: errors.array()
            })
        }
        else {
            addContact(request.body);
            // kirimkan flash message
            request.flash('msg', 'Data contact berhasil ditambahkan!');
            response.redirect('/contact');
        }
});

// form ubah data contact
app.get('/contact/edit/:nama', (request, response) => {
    const contact = findContact(request.params.nama);

    response.render('edit-contact', {
        layout: 'layouts/main-layout',
        title: 'Form Ubah Data Contact',
        contact: contact
    });
});

// proses ubah data contact
app.post('/contact/update',
    [
        body('nama').custom((value, {req}) => {
            const duplikat = cekDuplikat(value);
            if(value !== req.body.oldNama && duplikat) {
                throw new Error('Nama contact sudah digunakan!');
            }
            return true;
        }),
        check('email', 'E-mail tidak valid!').isEmail(),
        check('noHP', 'No. HP tidak valid!').isMobilePhone('id-ID')
    ],
    (request, response) => {
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            response.render('edit-contact', {
                title: 'Form Ubah Data Contact',
                layout: 'layouts/main-layout',
                errors: errors.array(),
                contact: request.body
            })
        }
        else {
            updateContacts(request.body);
            // kirimkan flash message
            request.flash('msg', 'Data contact berhasil diubah!');
            response.redirect('/contact');
        }
});

// proses delete contact
app.get('/contact/delete/:nama', (request, response) => {
    const contact = findContact(request.params.nama);
    
    // jika contact tidak ada
    if(!contact) {
        response.status(404);
        response.send('<h1>404</h1>');
    } else {
        deleteContact(request.params.nama);
        request.flash('msg', 'Data contact berhasil dihapus!');
        response.redirect('/contact');
    }
});


// halaman detail contact
app.get('/contact/:nama', (request, response) => {
    const contact = findContact(request.params.nama);
    
    response.render('detail', {
        layout: 'layouts/main-layout',
        title: "Halaman Detail Contact",
        contact: contact
    });
});


app.use('/', (request, response) => {
    response.status(404);
    response.send('<h1>404</h1>')
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

