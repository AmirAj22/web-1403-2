import {
    start,use
} from "./05-httpFramework-e.js"

import{
    readFile
} from 'fs'



use("GET",'sum', function(request, response){
    let url = request.url.split('/');
    let inputs = url.slice(2);
    response.write((parseInt(inputs[0]) + parseInt(inputs[1])).toString());
    response.end();
});

use("GET",'log', function(request, response){
    console.log('post data is:', request.data);
    response.end();
});

use("POST",'sum', function(request, response){
    response.write((parseInt(request.data.input1) + parseInt(request.data.input2)).toString());
    response.end();
});

use("GET" , "file" , function(request, response){
    let url = request.url.split('/');
    let inputs = url.slice(2);
})

function callBack(Err , response){
    if(Err)
    {
        console.log(Err)
    }
    else
    {
        response.write("Not Found");
        response.end();
    }
}

start();