const fs = require('fs');
const http = require('http');
const url = require('url');

///////////////////////////////
// Files
//Blocking,Synchronous way//

/*console.log("Hello World");*/
/* 
const textln = fs.readFileSync('./txt/input.txt','utf-8');
console.log(textln);
/*'this is what avocado: ${textln}. \n Created on ${Date.now()}';*/
/*const textout = `this is really awesome: ${textln}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt',textout);
console.log('File written!'); */

//Another Video
//Non-blocking, Asynchronous way

// fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{
    // if (err) return console.log('Error!! ');
//     fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`,'utf-8',(err,data3)=>{
//             console.log(data3);
//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',err=>{
//                 console.log('your file has been written');
//                 })
//            });       
//         });
// });
// console.log('will read file!!');
//////////////////////////////////////////
// Server 
const replaceTemplate=(temp,product)=>{
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output = output.replace(/{%IMAGE%}/g,product.image);
    output = output.replace(/{%PRICE%}/g,product.price);
    output = output.replace(/{%FROM%}/g,product.from);
    output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);
    output = output.replace(/{%QUANTITY%}/g,product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g,product.description);
    output = output.replace(/{%ID%}/g,product.id);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    return output;

}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,`utf-8`);
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,`utf-8`);
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,`utf-8`);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,`utf-8`);
const dataObj = JSON.parse(data);


const server = http.createServer((req, res)=>{
    const{ query, pathname} = url.parse(req.url,true);
    // console.log(req.url);
    // console.log(url.parse(req.url,true))
    // const pathname = req.url
    //overview page
    if(pathname ==='/' || pathname==='/overview'){
        res.writeHead(200,{'Content-type':'text/html'});
        const cardsHtml = dataObj.map(el =>replaceTemplate(tempCard,el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
        res.end(output);

          

//product page

    } else if (pathname==='/product'){
        res.writeHead(200, {'Context-type':'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }

// API
      else if(pathname==='/api'){    
        res.writeHead(200,{'Content-type':'application/json'});
        res.end(data);     
    }
    else {
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header':'hello-world'
        });
        res.end('Page not found!!');
    }
});


server.listen(8000,'127.0.0.1', ()=>{
    console.log('Here im boss staying in console & response from port 8000');
});

