#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// 함수 정의
vec3 rect(vec2 coord, vec2 loc, vec2 size){

}

void main() {
  vec2 coord = gl_FragCoord.xy / u_resolution;

  vec3 color = rect();

  gl_FragColor = vec4(color, 1.);
}
