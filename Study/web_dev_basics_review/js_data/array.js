const numbers = [1,2,3,4]
const fruits = ['Apple', 'Banana', 'Cherry']

// console.log(numbers[1])
// console.log(fruits[2]);

// console.log(numbers.length);
// console.log(fruits.length)
// console.log([].length);

// // 다른 함수의 인수로 사용되는 함수: 콜백함수

// numbers2 = [5,12, 8, 130, 44]

// const found = numbers2.find(e => e > 10)
// console.log(found)

// .concat() method
// console.log(numbers.concat(fruits))
// // 원본 배열 데이터가 수정되지 않는다.
// console.log(numbers);
// console.log(fruits)

// .forEach() method
// fruits.forEach(function(element, index, array) {
//   console.log(element, index, array);
// })

// fruits.forEach(function(element, index) {
//   console.log(element, index);
// })

// fruits.forEach((fruit, i) => {
//   console.log(`${i+1}번째 원소: ${fruit}`);
// })

// .map() method
// map()은 배열을 return한다.

// const b = fruits.map((fruit, index) => {
//   return `${fruit} - ${index}`
// })
// console.log(b)

// const squared = numbers.map(number => number * number)
// console.log(squared);

// const c = fruits.map((fruit, index) => {
//   return {
//     id: index,
//     name: fruit
//   }
// })

// console.log(c);

// const d  = fruits.map((fruit, index) => ({id: index, name: fruit}))
// console.log(d);

// .filter()
// const e = numbers.map(e => e<3)
// console.log(e);

// const f = numbers.filter(e=>e<3)
// console.log(f);

// .find()

// const g = fruits.find(fruit => {
//   return /^C/.test(fruit)
// })

// console.log(g);

// // .findIndex()
// const h = fruits.findIndex(fruit => {
//   return /^C/.test(fruit)
// })

// console.log(h);

// // .includes()
// console.log(numbers.includes(3));

// // .push()
// numbers.push(5)
// console.log(numbers);

// numbers.unshift(0)
// console.log(numbers);

// numbers.reverse()
// fruits.reverse()

// console.log(numbers);
// console.log(fruits);

// .splice()
// numbers.splice(2,2)
// console.log(numbers)

// numbers.splice(2,1,999)
// console.log(numbers);

fruits.splice(2,0,'Orange')
console.log(fruits)
