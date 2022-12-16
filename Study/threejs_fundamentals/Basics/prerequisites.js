//--- 1. 클로저(Closure)

// Example1
// function a(v) {
//   const foo = v;
//   return function() {
//     return foo;
//   }
// }

// const f = a(123);
// const g = a(456);
// console.log(f());
// console.log(g());

// Example2
// function increament() {
//   let saveNumber = 1;

//   return function() {
//     return saveNumber++;
//   }
// }

// const inc = increament();

// console.log(inc());
// console.log(inc());
// console.log(inc());

//--- 2. 배열 메서드

// (1) for ~ of 문
const profile = {
  name: 'donald trumph',
  age: 80,
  is_alive: true
};

for (const [key, value] of Object.entries(profile)) {
  console.log(`${key}: ${value}`);
}


// (2) forEach() 메서드
// 요소를 순회
const books = [
  "헨리6세",
  "리처드 3세",
  "실수연발",
  "말괄량이 길들이기",
  "헨리 8세"
];

books.forEach((book, idx) => {
  console.log(book, idx)
});

// (3) map() 메서드
// forEach()와는 달리, 함수를 적용한 결과를 모아 새로운 배열을 return한다.
const bookObjects = books.map((book) => {
  return {
    title: book,
    author: undefined
  }
})

console.log(bookObjects);

// (4) filter() 메서드
// 주어진 함수의 테스트를 통과한 요소만 모아 새로운 배열로 반환
function isBigEnough(value) {
  return value >= 10;
}

const filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
console.log(filtered)

//--- 3. destructuring
// (1) 객체의 경우
const dims = {width: 300, height: 150};
const {width, height} = dims;

// (2) 배열의 경우
const position = [5,6,7,1];
const [, y, z] = position;
console.log(y);

// 함수의 인자인 경우
const vectors = [3,4];

function lengthOfVector([x,y]) {
  return Math.sqrt(x * x + y * y);
}

const dist = lengthOfVector(vectors)

function area({width, height}) {
  return width * height;
}

const a = area(dims); 



