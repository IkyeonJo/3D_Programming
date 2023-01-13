// const aString = new String('abc');
// console.log(aString);

// 리터털 방식: 기호를 통해 자바스크립트 데이터를 손쉽게 나타내는 방식

const paragraph = 'The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?';

let searchTerm = 'dog';
const indexOfFirst = paragraph.indexOf(searchTerm);

console.log(`위 문장의 첫번째 인덱스는 "${indexOfFirst}"입니다.`)

const result = 'Hello World!'.indexOf('World')
console.log(result)

const str = '0123'

console.log(str.length)
console.log('01 23'.length)

const str1 = 'Hello World!'
console.log(str1.indexOf('word') !== -1)

searchTerm = 'World'
if (str1.indexOf(searchTerm) !== -1){
  console.log('포함되어 있네요!')
} else {
  console.log(`${searchTerm}은 포함되어 있지 않아요!`);
}

console.log(str1.slice(0,3))

console.log(str1.replace('World', 'Earth'));
console.log(str1.replace(' World', ''));

const str2 = 'joiyfull@gmail.com'
console.log(str2.match(/.+(?=@)/)[0])

const str3 = '      Hello World'
console.log(str3.trim());
