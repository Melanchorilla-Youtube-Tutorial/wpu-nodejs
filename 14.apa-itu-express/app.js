const express = require('express');
const app = express();
const port = 3000;


app.get('/', (request, response) => {
    // response.send("Hello World!");
    // response.json({
    //     nama: 'Dicky',
    //     email: 'dick@gmail.com',
    //     noHP: '08123456789'
    // });
    response.sendFile('./index.html', {root: __dirname});
});

app.get('/about', (request, response) => {
    // response.send("Halaman About!");
    response.sendFile('./about.html', {root: __dirname});

});


app.get('/contact', (request, response) => {
    // response.send("Halaman Contact!");
    response.sendFile('./contact.html', {root: __dirname});

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


// const fs = require('fs');
// const http = require('http');

// const renderHTML = (path, res) => {
//     fs.readFile( path, (error, data) => {
//         if(error) {
//             res.writeHead(404);
//             res.write('Error: file not found!');
//         } else {
//             res.write(data);
//         }
//         res.end();
//     });
// }


// const server = http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/html'
//     });

//     const url = req.url;
//     switch(url) {
//         case '/about':
//             renderHTML('./about.html', res);
//             break;
//         case '/contact':
//             renderHTML('./contact.html', res);
//             break;
//         default:
//             renderHTML('./index.html', res);
//             break;

//     }

// });

// server.listen(3000, () => {
//     console.log('Server is listening on port 3000');
// });