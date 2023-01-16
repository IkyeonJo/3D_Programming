const user = {
  name: 'Heropy',
  age: 85,
  emails: ['abc@gmail.com', 'xyz@naver.com']
}

// localStorage.setItem('user', JSON.stringify(user)) // JSON.stringify() 함수를 통해 자바스크립트 데이터를 문자 데이터로 변환
// console.log(JSON.parse(localStorage.getItem('user'))); // JSON.parse() 함수를 통해 문자 데이터를 자바스크립트 데이터로 변환
// // localStorage.removeItem('user') // 삭제

const str = localStorage.getItem('user')
const obj = JSON.parse(str)
obj.age = 22
console.log(obj)
localStorage.setItem('user', JSON.stringify(obj))