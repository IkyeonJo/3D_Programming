// 얕은 복사(shallow copy), 깊은 복사(Deep Copy)
import _ from 'lodash'

const user = {
  name: 'Heropy',
  age: 85,
  emails: ['abc@gmail.com']
}

// const copyUser = Object.assign({}, user)
// shallow copy
const copyUser = _.cloneDeep(user)

console.log(copyUser===user)

user.age = 22

console.log('user: ', user)
console.log('copyUser: ', copyUser);

console.log('----------------')
console.log('----------------')

user.emails.push('neo@gmail.com')

console.log(user.emails === copyUser.emails);

console.log('user: ', user)
console.log('copyUser: ', copyUser);

