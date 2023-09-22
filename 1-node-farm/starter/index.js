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
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,`utf-8`);
const dataObj = JSON.parse(data);


const server = http.createServer((req, res)=>{
    const pathName=req.url;

    if(pathName ==='/' || pathName==='/overview'){
        res.end('Hello Bangladesh Server From Overview Page');
    } else if (pathName==='/product'){
        res.end('Hello Bangladesh Server from product,Pick your best Product');
    }
      else if(pathName==='/api'){    
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

