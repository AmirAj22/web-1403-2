import {createServer} from 'http'

let myServer = createServer(function(request,response){
   let url = request.url.split('/')
   let command = url[1]
   let inputs = url.slice(2);

   if(command === "sum"){
    response.write((+inputs[0] + +inputs[1]).toString())
   } else{
    response.write("Command Not Found")
   }

    response.end();
})

myServer.listen(80)