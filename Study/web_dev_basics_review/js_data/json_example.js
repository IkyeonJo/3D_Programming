// JSON(Java Script Object Notation)
// 자바스크립트의 객체 표기법

// import myData from './myData.json'

// console.log(myData)

const user = {
  name: 'Heropy',
  age: 82,
  emails: [
    "abc@gmail.com", "def@naver.com"
  ],
  companyName: "fintelligence"
}

console.log(user);

// JSON화
const str = JSON.stringify(user)
console.log('str: ', str);
console.log(typeof str)

// 객체화
const obj = JSON.parse(str)
console.log('obj: ', obj)
console.log(typeof obj)