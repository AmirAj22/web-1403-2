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
else{
    console.log("ERR")
}