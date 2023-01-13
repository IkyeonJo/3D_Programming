import _ from 'lodash'

const usersA = [
  {userId: 1, name: 'Heropy'},
  {userId: 2, name: 'Neo'}
]

const usersB = [
  {userId: 1, name: 'Heropy'},
  {userId: 3, name: 'Amy'}
]

const usersC = usersA.concat(usersB)
console.log('concat: ', usersC)

console.log('uniq_By: ', _.uniqBy(usersC, 'userId'));


// 아직 두 데이터를 합치기 전이라면, unionBy()를 통해서 고유하게 합칠 수 있음
const usersD = _.unionBy(usersA, usersB, 'userId')
console.log('union: ', usersD)
