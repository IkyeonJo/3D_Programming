type Book = {
  title: string;
  copyright?: string;
  author?: string;
};


const books: string[] = [
  "헨리6세",
  "리처드 3세",
  "실수연발",
  "말괄량이 길들이기",
  "헨리 8세"
];

// 순회
books.forEach((book: string, idx: number) => {
  console.log(book, idx)
});

// map() 함수: forEach()와는 달리, 함수를 적용한 결과를 모아 새로운 배열을 return한다.
const bookObjects:Book[] = books.map( (book:string) => {
  return {
    title: book,
    author: undefined
  }
})

// console.log(bookObjects);

const ShakespeareBooks: Book[] = books
.map((book:string)=>({title: book}))
.map((book: Book) => ({
  ...book,
  author: "William Shakespeare"
}));

// console.log(ShakespeareBooks);

// filter() 함수: 주어진 함수의 테스트를 통과한 요소만 모아 새로운 배열로 반환
// 예1
// const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

// const result = words.filter(word=>word.length>6);
// console.log(result);

// 예2
// const henry: Book[] = ShakespeareBooks.filter((book:Book)=> book.title.includes('헨리'));

// console.log(henry)

// 예3
function isBigEnough(value) {
  return value >= 10;
}

const filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
console.log(filtered)

// reduce() 함수
const someObjects = [{border: "none"}, {fontSize: 24}, {className: "box sm-box"}];
const someObject = someObjects.reduce((a,b)=>({...a, ...b}), {})

console.log(someObject);