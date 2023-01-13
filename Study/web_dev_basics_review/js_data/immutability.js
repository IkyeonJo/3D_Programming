// 데이터 불변성(immutability)
// 원시 데이터: String, Number, Boolean, undefined, null
// 참조형 데이터: Object, Array, Function

// (1) 원시 데이터
// let a=1
// let b=4
// // 메모리의 주소가 동일한 지를 비교하는 것이다!
// console.log(a, b, a===b);
// b = a // b에 a가 바라보고 있는 메모리 주소를 할당
// console.log(a, b, a===b)
// a = 7
// console.log(a, b, a===b);
// let c=1
// console.log(b, c, b===c);

// (2) 참조형 데이터
let a = {k:1}
let b = {k:1}

// console.log(a, b, a===b) // a,b 가 모양은 같지만, 각각 바라보고 있는 메모리 주소가 다르기 때문에 false로 나옴
// 참조형 데이터는 생성될 때마다 다른 메모리 주소를 참조한다. 즉 불변성이 없으며, 가변한다.

a.k = 7
b = a
console.log(a, b, a===b) //  이제 같은 메모리 주소를 바라보고 있기 때문에 같다고 나온다.
a.k =2
console.log(a,b,a===b)
let c = b
console.log(a,b,c, a===c)
a.k = 9
console.log(a,b,c, a===c)
// 데이터가 복사되는 개념이 아니라, 단지 주소만 바라봄