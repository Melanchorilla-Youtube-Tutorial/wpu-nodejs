const fs = require('fs');
const http = require('http');

const renderHTML = (path, res) => {
    fs.readFile( path, (error, data) => {
        if(error) {
            res.writeHead(404);
            res.write('Error: file not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
}


const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    const url = req.url;
    // if(url === '/about'){
    //      renderHTML('./about.html', res);
    // } else if (url === '/contact'){
    //     renderHTML('./contact.html', res);
    // } else {
    //     renderHTML('./index.html', res);
    // }

    switch(url) {
        case '/about':
            renderHTML('./about.html', res);
            break;
        case '/contact':
            renderHTML('./contact.html', res);
            break;
        default:
            renderHTML('./index.html', res);
            break;

    }

});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});