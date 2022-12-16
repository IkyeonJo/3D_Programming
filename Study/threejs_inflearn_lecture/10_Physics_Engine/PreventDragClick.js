export class PreventDragClick {
  constructor(elem) {
    this.mouseMoved ; // 마우스를 드래그했는 여부. true/false
    let clickStartX ;
    let clickStartY ;
    let clickStartTime; // 클릭 후 일정 시간이 지나면, 클릭 안한 것으로 처리
  
    elem.addEventListener('mousedown', e => {
      clickStartX = e.clientX;
      clickStartY = e.clientY;
      clickStartTime = Date.now();
    });
    elem.addEventListener('mouseup', e => {
      const xGap = Math.abs(e.clientX - clickStartX);
      const yGap = Math.abs(e.clientY - e.clickStartY)
      const timeGap = Date.now() - clickStartTime;
  
      if (xGap > 5 ||
          yGap > 5 ||
          timeGap > 500 // 클릭했다가 뗀 시간이 0.5초 이상인 경우
          ){
            this.mouseMoved = true;
          } else {
            this.mouseMoved = false
          }
    });
  }
}