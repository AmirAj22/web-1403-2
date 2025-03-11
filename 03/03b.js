let fs = require('fs');
let input = process.argv.slice(3);
let command = process.argv[2];

if (command === 'sum') {
    console.log(Number(input[0]) + Number(input[1]));
}
else if (command === 'minus') {
    console.log(Number(input[0]) - Number(input[1]));
}
else if (command === 'print') {
    let obj={
        name: input[0],
        family: input[1],
        email: input[2]
    }
    console.log(obj);
}
else if (command === 'print2') {
    let obj={
        name: input[0],
        family: input[1],
        email: input[2]
    }
    for(let x in obj){
        console.log('salam: ' + obj[x]);
    }
}
else if (command === 'write') {
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
else if (command === 'create') {
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
else if(command === 'read'){

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
else {
    console.log('Command not found.');
}

