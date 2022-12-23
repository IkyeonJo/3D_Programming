#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// 0~1 사이 값을 이용하여 직선 그리기
float plot(vec2 st, float pct) {
  return smoothstep(pct-0.02, pct, st.y) - smoothstep(pct, pct+0.02, st.y);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  float y = pow(st.x, 5.0) ;
  vec3 color = vec3(y); // 0.0~1.0 사이의 값을 3개 갖는 벡터

  // 직선 그리기
  float pct = plot(st, y);
  // 선형보간 
  color = (1.0-pct)*color + pct*vec3(0.0,1.0,0.0);
  // 위에서 pct가 0이면, +의 앞부분, 즉 color만 남음 => 바탕 색 분
  // 위에서 pct가 1이면 +의 뒷부분, 즉 vec3(0.0,1.0,0.0)만 남음 => 녹색 선 부분
  gl_FragColor = vec4(color, 1.);
}