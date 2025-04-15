import {createServer} from 'http';

let controllers = [];

function use(method,name, func){
    let item = {
        command: name,
        function: func,
        method:method
    }
    controllers.push(item);
}

let found = false

function router(method,request, response){
    let url = request.url.split('/');
    let command = url[1];
    for(let item of controllers){
        if(item.command === command && item.method === method){
            item.function(request, response);
            found = true
        }
    }

    if(!found){
        response.write("NOT FOUND");
        response.end();
    }
}

let myServer = createServer(function(request, response){

    let data = '';
    request.on("data", function(chunk){
        data += chunk;
    });
    request.on("end", function(){
        try{
            data = JSON.parse(data);
        }
        catch(e){

        }
        request.data = data;
        request.asghar = 1;
        router(request.method,request, response);
    });
});

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

// function router(request, response){
//     let url = request.url.split('/');
//     let command = url[1];
//     let inputs = url.slice(2);
//     console.log('command:', command, 'inputs:', inputs);

//     if(command === 'sum' && request.method === 'GET'){
//         response.write((parseInt(inputs[0]) + parseInt(inputs[1])).toString());
//         response.end();
//     }
//     else if(command === 'log'){
//         console.log('post data is:', request.data);
//         response.end();
//     }
//     else if(command === 'sum' && request.method === 'POST'){
//         response.write((parseInt(request.data.input1) + parseInt(request.data.input2)).toString());
//         response.end();
//     }
//     else{
//         response.write("Command not found.");
//         response.end();
//     }
// }
myServer.listen(80);

// export {
//     start, 
//     use
// }