// Core Module
// File System
const fs = require('fs');

// menuliskan string ke file (synchronous)
// try {
//     fs.writeFileSync('data/test.txt', 'Hello World secara Synchronous!');
// }catch(e) {
//     console.log(e);
// }

// menuliskan string ke file (asynchronous)
// fs.writeFile('data/test.txt', 'Hello World secara Asynchronous', (e) => {
//     console.log(e);
// });

// membaca isi file (synchronous)
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// const data = fs.readFileSync('data/test.txt');
// console.log(data.toString());

// membaca isi file (asynchronous)
// fs.readFile('data/test.txt', 'utf-8', (e, data) => {
//     if(e) throw e;
//     console.log(data);
// });

// Readline
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Masukkan nama anda: ', (nama) => {
    rl.question('Masukkan no HP anda: ', (noHP) => {
        // console.log(`Terima kasih ${nama}, sudah input nomor ${noHP}`);
        const contact = {nama,noHP}
        const file = fs.readFileSync('data/contacts.json', 'utf8');
        const contacts = JSON.parse(file);

        contacts.push(contact);

        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

        console.log("Data disimpan");

        rl.close();
    });
});

