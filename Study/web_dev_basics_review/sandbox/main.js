// // this의 값은 함수를 호출한 방법에 의해 결정됨 
// 화살표 함수에서의 this는 함수가 속해 있는 곳의 상위 this를 계승받는다.
// const car = {
//   name: 'kia',
//   getName: function(){
//     console.log("car getName", this)
//   },
// }

// // car.getName();

// const globalCar = car.getName;
// globalCar();

// const car2 = {
//   name: "hyundai",
//   getName: car.getName,
// }
// car2.getName();
// const bindGetname = car2.getName.bind(car);
// bindGetname();

// const btn = document.getElementById('button')
// btn.addEventListener('click', car.getName.bind(car))

const testCar = {
  name: "benz",
  getName: function() {
    console.log("getname", this);
    const innerFunc = () => {
      console.log("innerFunc", this)
    }
    innerFunc();
  }
};

testCar.getName();
