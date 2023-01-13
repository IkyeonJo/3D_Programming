#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// 함수 정의
vec3 rect(vec2 coord, vec2 loc, vec2 size){ // loc: 사각형의 중심
  vec2 sw = loc-size/2.;
  vec2 ne = loc+size/2.;
  vec2 pct = step(sw, coord);
  pct -= step(ne, coord);
  return vec3(pct.x * pct.y); // 사각형 안쪽만 pct.x와 pct.y가 모두 1 => 곱한 결과도 0, 나머지 영역은 0
}

void main() {
  vec2 coord = gl_FragCoord.xy / u_resolution;
  vec3 color = rect(coord, vec2(0.5), vec2(0.5));
  gl_FragColor = vec4(color, 1.);
}
