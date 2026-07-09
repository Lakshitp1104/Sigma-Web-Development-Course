console.log("i am a study on loops")

let a = 1;
// console.log(a)
// console.log(a+1)

for (let i = 0; i < 100; i++) {
    console.log(a+i);    
}

let obj = {
    name: "lakshit",
    role: "programmer", 
    company: "chatgpt" 
}

 for (const key in obj) {
    const element =obj [key];
    console.log(key, element)
    }

for (const c  of "lakshit" ) {
    console.log(c)
    
}
for (const key in obj) {
    console.log(key)   
}

let i = 0 ;
while (i<6) {
    console.log(i)
    i++;
}

let i = 0;
do {
    console.log(i)
    i++;
} while (i < 9);