// const userAge = {
//   name: 'Heropy',
//   age: 85
// }

// const userEmail = {
//   name: 'Heropy',
//   email: 'thesecon@gmail.com'
// }

// const target = Object.assign({}, userAge, userEmail)
// console.log(target);
// console.log(userAge)
// console.log(target===userAge);

const user = {
  name: 'Heropy',
  age: 85,
  email: 'thesecon@gmail.com'
}

const keys = Object.keys(user) // static method
console.log(keys)

console.log(user['email']);
console.log(user.email);

const values = keys.map(key=>user[key])
console.log(values)