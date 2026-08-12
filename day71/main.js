const { error } = require("console")
const fs = require("fs")

// console.log(fs)

console.log("starting")
// fs.writeFileSync("lakshit.txt", "lakshit is good boy")
// console.log("ending")

fs.writeFile("lakshit2.txt","Lakshit is good boy",()=>{
    console.log("done")
    fs.readFile("lakshit2.txt", (erroe, data)=>{
        console.log(error, data.toString())
    })
})

fs.appendFile("lakshit", "lakshitpatil" ,(e, d)=>{
    console.log(d)
})
console.log("ending")