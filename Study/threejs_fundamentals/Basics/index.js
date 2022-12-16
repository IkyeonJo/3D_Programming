var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var books = [
    "헨리6세",
    "리처드 3세",
    "실수연발",
    "말괄량이 길들이기",
    "헨리 8세"
];
// 순회
books.forEach(function (book, idx) {
    console.log(book, idx);
});
// map() 함수: forEach()와는 달리, 함수를 적용한 결과를 모아 새로운 배열을 return한다.
var bookObjects = books.map(function (book) {
    return {
        title: book,
        author: undefined
    };
});
// console.log(bookObjects);
var ShakespeareBooks = books
    .map(function (book) { return ({ title: book }); })
    .map(function (book) { return (__assign(__assign({}, book), { author: "William Shakespeare" })); });
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
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
console.log(filtered);
// reduce() 함수
var someObjects = [{ border: "none" }, { fontSize: 24 }, { className: "box sm-box" }];
var someObject = someObjects.reduce(function (a, b) { return (__assign(__assign({}, a), b)); }, {});
console.log(someObject);
