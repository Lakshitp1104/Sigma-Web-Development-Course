console.log("im lakshit patil")
console.log("im patil lakshit")


setTimeout(() => {
    console.log("im inside settimeout")
}, 2000);

setTimeout(() => {
    console.log("im inside settimeout2")
}, 1000);

console.log("the end")

const callback = (arg) => {
    console.log(arg)
}

const loadScript = (src, callback) => {
    let sc = document.createElement("script")
    sc.src = src;
    sc.onload = callback("lakshit");
    document.head.append(sc)
}

loadScript("https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js", callback)