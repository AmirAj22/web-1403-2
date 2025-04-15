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

function start(){
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
    myServer.listen(80);

}

export {
    start, 
    use
}