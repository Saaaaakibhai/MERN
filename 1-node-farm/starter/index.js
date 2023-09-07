const fs = require('fs');

/*console.log("Hello World");*/

const textln = fs.readFileSync('./txt/input.txt','utf-8');
console.log(textln);
/*'this is what avocado: ${textln}. \n Created on ${Date.now()}';*/
const textout = `this is really awesome: ${textln}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt',textout);
console.log('File written!');