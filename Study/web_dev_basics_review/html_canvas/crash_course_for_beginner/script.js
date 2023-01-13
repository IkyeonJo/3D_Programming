window.addEventListener('load', function(){
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth * 0.8
  canvas.height = window.innerHeight * 0.8

  // canvas settings 
  ctx.fillStyle = 'green'
  ctx.strokeStyle = 'yellow'
  ctx.lineWidth = 30
  ctx.lineCap = 'round'

  // effect settings
  let size = 200
  ctx.save();
  ctx.translate(100,100)
  ctx.scale(0.8, 0.8)
  ctx.rotate(0.4)
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.restore()

  ctx.beginPath();
  ctx.moveTo(canvas.width/2, canvas.height/2)
  ctx.lineTo(size, canvas.height/2)
  ctx.stroke();
})