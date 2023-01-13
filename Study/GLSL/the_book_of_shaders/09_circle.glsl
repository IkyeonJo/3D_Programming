#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// 함수 정의
vec3 circle(vec2 coord, vec2 loc, float r){
  float d;
  // d = distance(coord, loc);
  d = length(coord-loc);
  // d = step(r, d); // 이 경우 원과 바깥쪽 경계 부분의 깨짐 현상 발생. 이를 방지하기 위해 smoothstep() 함수 사용할 필요
  d = smoothstep(r, r+ 0.001, d);
  return vec3(d);
}

void main() {
  vec2 coord = gl_FragCoord.xy / u_resolution;
  vec3 color = circle(coord, vec2(0.5), 0.3);
  gl_FragColor = vec4(color, 1.);
}
