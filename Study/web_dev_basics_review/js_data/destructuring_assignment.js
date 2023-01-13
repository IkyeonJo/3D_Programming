// 구조분해 할당(Destructuring assignment)

// 객체 데이터의 구조분해 할당
// const user = {
//   name: 'ikyeon',
//   age: 53,
//   email: "joiyfull@gmail.com",
//   address: 'USA'
// }

// const {name: ikyeon, age, address='Korea'} = user

// console.log(`사용자의 이름은 ${ikyeon}입니다.`)
// console.log(`${ikyeon}님의 나이는 ${age} 살입니다.`);
// console.log(`${ikyeon}님의 이메일은 ${user.email}입니다.`);
// console.log(address);

// 배열 데이터도 구조분해 할당을 할 수 있다!
// 키(이름)을 통해 데이터를 꺼내오는 객체와는 달리, 배열 데이터는 순서를 지켜줘야 한다.


const fruits = ['Apple', 'Banana', 'Cherry']
const [,,b] = fruits
console.log(b);