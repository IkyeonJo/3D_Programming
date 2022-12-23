#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// 0~1 사이 값을 이용하여 직선 그리기
float plot(vec2 st) {
  return smoothstep(0.02, 0.0, abs(st.y - st.x));
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  float y = st.x;
  vec3 color = vec3(y); // 0.0~1.0 사이의 3개 원소를 갖는 벡터

  //--- 직선 그리기
  float pct = plot(st);
  // 선형보간 
  color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

  // 직선 이외의 바탕색, 좌측에서 우측으로 검은색에서 흰색으로 gradation되는 부분
  // 위 19~22를 주석처리해 보면 알 수 있음
  gl_FragColor = vec4(color, 1.);
}