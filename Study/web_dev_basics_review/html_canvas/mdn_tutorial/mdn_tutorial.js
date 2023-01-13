// function draw() { // primitive 사각형 그리기
//   const canvas = document.getElementById('tutorial')
//   if (canvas.getContext) {
//     const ctx = canvas.getContext('2d')
    
//     ctx.fillRect(25,25, 100,100)
//     ctx.clearRect(45, 45, 60, 60)
//     ctx.strokeRect(50, 50, 50,50)
//   }
// }

// draw()

// function draw_triangle() { // 삼각형 그리기
//   const canvas = document.getElementById('tutorial')
//   const ctx = canvas.getContext('2d')

//   ctx.beginPath() // 새로운 경로 생성
//   ctx.moveTo(75, 50) // 펜을 들어 (x,y) 좌표로 옮김
//   ctx.lineTo(100, 75)
//   ctx.lineTo(100,25)
//   ctx.fill()
// }

// draw_triangle()

// function draw_smile_icon() { // 스마일 아이콘 그리기
//   const canvas = document.getElementById('tutorial')
//   const ctx = canvas.getContext('2d')

//   ctx.beginPath() // 새로운 경로 생성
//   ctx.arc(75, 75, 50, 0, Math.PI*2, true) // 바깥쪽 원
//   // arc(x, y, radius, startAngle, endAngle, counterclockwise): 중심좌표, 반지름, 시작/끝 각도, 반시계방향 여부
//   ctx.moveTo(110,75)
//   ctx.arc(75, 75, 35, 0, Math.PI, false) // 입: 반원, 시계방향(false: clock-wise):
//   ctx.moveTo(65, 65)
//   ctx.arc(60, 65, 5, 0, Math.PI*2, true) // 왼쪽 눈
//   ctx.moveTo(95, 65)  
//   ctx.arc(90, 65, 5, 0, Math.PI*2, true)  // 오른쪽 눈
//   ctx.stroke()
// }

// draw_smile_icon()

// function draw_double_triangle() { // 스마일 아이콘 그리기
//   const canvas = document.getElementById('tutorial')
//   const ctx = canvas.getContext('2d')

//   // 채워진 삼각형
//   ctx.beginPath()
//   ctx.moveTo(25, 25) // 시작점
//   ctx.lineTo(105, 25)
//   ctx.lineTo(25, 105)
//   ctx.fill()

//   // 윤곽선만 있는 삼각형
//   ctx.beginPath() // 새로운 경로 선언
//   ctx.moveTo(125, 125) // 시작점
//   ctx.lineTo(125, 45)
//   ctx.lineTo(45,125)
//   ctx.closePath() // 마지막 선분을 채우게 됨.
//   ctx.stroke()
// }

// draw_double_triangle()

function draw_various_arcs() { // 스마일 아이콘 그리기
  const canvas = document.getElementById('tutorial')
  const ctx = canvas.getContext('2d')

  for (let i=0; i<4; i++) {
    for (let j=0; j<3; j++) {
      ctx.beginPath()
      const x = 25 + j * 50 ; // 원의 중심 x좌표
      const y = 25 + i * 50 ; // 원의 중심 y자표
      const radius = 20;  // 반지름
      const startAngle = 0 ;
      const endAngle = Math.PI + (Math.PI * j) / 2 ;

      const counterClockwise = i % 2 !==0

      ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise)
      if (i>1) {
        ctx.fill()
      } else {
        ctx.stroke()
      }
    }
  }
}

draw_various_arcs()
