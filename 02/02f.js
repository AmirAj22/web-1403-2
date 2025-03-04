console.log("Enter Numbers : ",process.argv)
let sum = 0
let command = process.argv[2]
let numbers = process.argv.slice(3)
if(command === "sum"){
    for (let index = 0; index < numbers.length; index++) {
        sum += +numbers[index];
    } 
    console.log("Sum :" + sum)
} 
else if(command === "minus"){
    console.log(numbers[0] - numbers[1])
}
else if(command === "print"){
    let obj = {name :numbers[0],family:numbers[1],gmail: numbers[2] }
    console.log(obj)
} 
else if(command === "print2"){
    let obj = {name :numbers[0],family:numbers[1],gmail: numbers[2] }
    for(let x in obj)
    {
        console.log("Hello "+obj[x])
    }
} 
else{
    console.log("ERR")
}