import {writeFile, readFile} from 'fs';
import {use, start, write} from "./05-httpFramework-f.js";
import pkg from 'jsonwebtoken'
const {sign,verify} = pkg;

function verifyToken(token,response){
    try{
        let userToken = verify(token,"myKey")
        if((Date.now()/1000 - userToken.iat)/60  < 10){
            return true
        }
        else{
            return false
        }
    } 
    catch{
        response.write("Err");
        response.end();
    }
}

use('POST', 'sum', function (request, response) {
    if(verifyToken(request.data.token,response)){
        response.write((parseInt(request.data.input1) + parseInt(request.data.input2)).toString());
        response.end();
    } 
    else{
        response.write("Token Not Found");
        response.end();
    }

});
use('GET', 'sum', function (request, response) {
    let url = request.url.split('/');
    let inputs = url.slice(2);
    response.write((parseInt(inputs[0]) + parseInt(inputs[1])).toString());
    response.end();
});
use('GET', 'log', function (request, response) {
    console.log('post data is:', request.data);
    response.end();
});
use('GET', 'file', function (request, response) {
    let url = request.url.split('/');
    let inputs = url.slice(2);

    readFile(inputs[0], function (error, fileBody){
        if(error){
            console.log('ERROR:', error);
            write(response, 400, 'ERROR:' + error)
        }
        else{
            response.write(fileBody);
            response.end();
        }
    });
});
use('POST', 'user', function (request, response) {
    readFile('./users.json', 'utf8', function (error, fileData){
        if(error){
            console.log('ERROR:', error);
            write(response, 500, 'ERROR:' + error);
        }
        else{
            let dataObject = JSON.parse(fileData);
            let userCheck = false
            dataObject.records.forEach(function(userName){
                if(userName.user === request.data.user){
                    userCheck = true
                }
                
            })
            dataObject.records.push(request.data);
            let dataString = JSON.stringify(dataObject);
            
            if(!userCheck){
            writeFile('./users.json', dataString, function (error){
                if(error){
                    console.log('ERROR:', error);
                    write(response, 500, 'ERROR:' + error)
                }
                else{
                    console.log('User Created.');
                    write(response, 200, 'User Created.')
                }
            });
            } else{
                write(response, 400, 'User Already Exist.')
            }
        }
    });
});
use('DELETE', 'user', function (request, response) {
    readFile('./users.json', 'utf8', function (error, fileData){
        if(error){
            console.log('ERROR:', error);
            write(response, 500, 'ERROR:' + error);
        }
        else{
            let dataObject = JSON.parse(fileData);
            for (let i = 0; i < dataObject.records.length; i++) {
                if(dataObject.records[i].user ===  request.data.user){
                    console.log(dataObject.records)
                    dataObject.records.splice(i,1)
                }
            }
            console.log(dataObject)
            dataObject.records.push(request.data);
            let dataString = JSON.stringify(dataObject);
            writeFile('./users.json', dataString, function (error){
                if(error){
                    console.log('ERROR:', error);
                    write(response, 500, 'ERROR:' + error)
                }
                else{
                    console.log('User Created.');
                    write(response, 200, 'User Deleted.')
                }
            });
        }
    });
});
use('POST', 'token', function (request, response) {
    readFile('./users.json', 'utf8', function (error, fileData){
        if(error){
            console.log('ERROR:', error);
            write(response, 500, 'ERROR:' + error);
        }
        else{
            let dataObject = JSON.parse(fileData);
            let checkUserName = false;
            for (let i = 0; i < dataObject.records.length; i++) {
                if(dataObject.records[i].user ===  request.data.user && dataObject.records[i].pass ===  request.data.pass){
                    checkUserName = true
                }
            }
            if(checkUserName){
                let token = sign(request.data,"myKey")
                write(response, 200,  JSON.stringify(token))
            } else{
                write(response, 400, "User Or Password Wrong!!")
            }
        }
    });
});

start();
