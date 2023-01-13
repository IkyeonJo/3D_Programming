import _ from 'lodash'

const users = [
  {usersId: '1', name: 'Heropy'},
  {usersId: '2', name: 'Neo'},
  {usersId: '3', name: 'Amy'},
  {usersId: '4', name: 'Evan'},
  {usersId: '5', name: 'Lewis'},
]

const foundUser = _.find(users, {name: 'Amy'})
const foundUserIndex = _.findIndex(users, {name: 'Amy'})

console.log(foundUser);
console.log(foundUserIndex);

_.remove(users, {name: 'Heropy'})
console.log(users)