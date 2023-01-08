// new Promise((resolve, reject) => {
//   console.log('Inside promise');
//   reject(new Error('First reject'))
//   resolve('First resolve')
// })
// .then(value => {
//   console.log('Inside first then')
//   console.log('value: ', value);
// })
// .catch(error => {
//   console.log('error', error)
// })

new Promise((resolve, reject) => {
  console.log('Before timeout');
  setTimeout(() => {
    resolve(Math.random())
    console.log('After resolve')
  }, 2000)
}).then((value) => {
  console.log('value: ', value)
})