const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// membuat folder jika tidak ada
const dirPath = './data';
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika tidak ada
const dataPath='./data/contacts.json';
if(!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const pertanyaan1 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Masukkan nama anda: ', (nama) => {
            resolve(nama);
        });
    });
}

const pertanyaan2 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Masukkan email anda: ', (email) => {
            resolve(email);
        });
    });
}

const pertanyaan3 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Masukkan noHp anda: ', (noHp) => {
            resolve(noHp);
        });
    });
}

const main = async () => {
    const nama = await pertanyaan1();
    const email = await pertanyaan2();
    const noHp = await pertanyaan3();

    const contact = {nama, email, noHp}
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts = JSON.parse(fileBuffer);

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log("Data disimpan");

    rl.close();
}

main();

// rl.question('Masukkan nama anda: ', (nama) => {
//     rl.question('Masukkan no HP anda: ', (noHP) => {
//         const contact = {nama,noHP}
//         const fileBuffer = fs.readFileSync('data/contacts.json', 'utf8');
//         const contacts = JSON.parse(fileBuffer);

//         contacts.push(contact);

//         fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

//         console.log("Data disimpan");

//         rl.close();
//     });
// });


