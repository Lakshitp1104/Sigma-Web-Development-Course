async function sleep() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(45)
        }, 1000);
    })
}
(async function main() {
    // let a = await sleep()
    // console.log(a)
    // let b = await sleep()
    // console.log(b)

    let [x,y,...rest] = [1,3,4,55,67,8,65,4,3,45,67,8,]
    console.log(x,y,rest)
})()