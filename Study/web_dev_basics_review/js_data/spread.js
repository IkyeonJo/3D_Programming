// 전개 연산자(Spread)

const fruits = ['Apple', 'Banana', 'Cherry', 'Orange']
// console.log(fruits)
// console.log('Apple', 'Banana', 'Cherry')
// console.log(...fruits);

// function toObject(a, b, c) {
//   return {
//     a:a,
//     b:b,
//     c:c
//   }
// }

const toObject = (a,b,...c) => ({a,b,c})
console.log(toObject(...fruits))

