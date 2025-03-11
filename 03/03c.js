let fs = require('fs');
let input = process.argv.slice(3);
let command = process.argv[2];

let controllers = [
    {
        command : "sum", 
        function : function sum(input){
        console.log(Number(input[0]) + Number(input[1]));
        }
    },
    {
        command:"minus",
        function : function minus(input){
            console.log(Number(input[0]) - Number(input[1]));
        }
    },
    {
        command:"print",
        function : function print(input){
            let obj={
                name: input[0],
                family: input[1],
                email: input[2]
            }
            console.log(obj);
        }
    },
    {
        command:"print2",
        function : function print2(input){
            let obj={
                name: input[0],
                family: input[1],
                email: input[2]
            }
            for(let x in obj){
                console.log('salam: ' + obj[x]);
            }
        }
    },
    {
        command:"write",
        function : function write(input){
            let obj={
                name: input[0],
                family: input[1],
                email: input[2]
            }
            function writeCallback(error, data){
                if(error){
                    console.log('ERROR:', error);
                }
                else{
                    console.log('write done.');
                }
            }
            fs.writeFile('./data.txt', JSON.stringify(obj), writeCallback);
        }
    },
    {
        command:"create",
        function : function create (input){
            let obj={
                name: input[0],
                family: input[1],
                email: input[2]
            }
            fs.readFile('./data.json', 'utf8', function (error, data){
                if(error){
                    console.log('ERROR:', error);
                }
                else{
                    let dataObject = JSON.parse(data);
                    dataObject.data.push(obj);
                    let dataString = JSON.stringify(dataObject);
                    
                    fs.writeFile('./data.json', dataString, function (error){
                        if(error){
                            console.log('ERROR:', error);
                        }
                        else{
                            console.log('create Done.');
                        }
                    });
                }
            });
        }
    },
    {
        command:"read",
        function : function read(input){
            fs.readFile('./data.json', 'utf8', function (error, data){
                if(error){
                    console.log('ERROR:', error);
                }
                else{
                    let check = false
                    if(input.length === 0){
                        console.log("data : " + data)
                    }
                    else{
                        let userObj = JSON.parse(data)
                        for(let i = 0;i<userObj.data.length;i++){
                            if(userObj.data[i].name === input[0]){
                                console.log(userObj.data[i])
                                check = true
                            }
                        }
                        if(!check){
                            console.log("Not Found")
                        }
                    }
                }
            });
        }
    },
]

for(let controller of controllers){
    if(controller.command == command){
        controller.function(input);
    }
}




