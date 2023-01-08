#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void plus(inout vec3 col) {
  col = col +.5;
}

// void plus(in vec3 col) { // 여기서 in을 안써도 된다.
//   col = col +.5;
// }

void main() {
  vec3 col = vec3(.0);
  plus(col);
  gl_FragColor = vec4(col, 1.);
}

