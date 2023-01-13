// 전개 연산자(Spread)2

function sum(x,y,z) {
  return x+y+z;
}

const numbers = [1,2,3]
console.log(sum(...numbers))

const parts = ['shoulders', 'knees']
const lyrics = ['head', ...parts, 'and', 'toes']
console.log(lyrics)

const arr = [1,2,3]
const arr2 = [...arr]
arr2.push(4)
console.log(arr2);

const obj1 = {foo:'bar', x:42}
const obj2 = {foo: 'baz', y:13}

const clonedObj = {...obj1}
console.log(clonedObj)

const mergedObj = {...obj1, ...obj2}
console.log(mergedObj);