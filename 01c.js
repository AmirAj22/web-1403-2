console.log("Enter Numbers : ",process.argv)
let sum = 0
for (let index = 2; index < process.argv.length; index++) {
    sum += +process.argv[index];
}

console.log("Sum :" + sum)