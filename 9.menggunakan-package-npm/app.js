const validator = require('validator');
const chalk = require('chalk');

// console.log(validator.isEmail('budi@gmail.com'));
// console.log(validator.isMobilePhone('0812345678', 'id-ID'));
// console.log(validator.isNumeric('123141'));


// console.log(chalk.blue('Hello World'));
// console.log(chalk.black.bgBlue.italic('Hello World'));
const nama = 'Sandhika';
const pesan = chalk`Lorem ipsum, dolor {bgRed.black.bold sit amet} consectetur {bgGreen.italic.black adipisicing} elit. Eligendi, doloribus? Nama saya: ${nama}`;
console.log(pesan);