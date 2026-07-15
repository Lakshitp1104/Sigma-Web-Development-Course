let a= [1,2,3,4,5,6];
// let newArr = []

// for (let index = 0; index < a.length; index++) {
//     const element = a[index];
//     newArr.push(element**2)    
// }

let newArr = a.map((e, index ,arr)=> {
  return e**2
})
console.log(newArr)


const greterThenSeven = (e)=>{
    if (e>7){
        return true
    }
    return false
}
console.log(newArr.filter( greterThenSeven))

let arr2 =  [1,2,3,4,5,6];

const red = (a, b)=>{
    return a*b
}

console.log(arr2.reduce(red))

