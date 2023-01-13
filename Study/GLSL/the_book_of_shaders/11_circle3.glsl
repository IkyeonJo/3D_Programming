#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

void main() {
  vec2 coord = gl_FragCoord.xy / u_resolution.xy ;
  coord = coord*2.0 - 1. ;
  coord.x *= u_resolution.x / u_resolution.y ;
  // 해당 픽셀이 갖고 있는 중심으로부터의 각의 크기
  float a = atan(coord.y, coord.x);
  // 중심과의 거리
  float d = length(coord);

  // 바람개비가 돌아가게 하는 효과
  // a += u_time; 
  // 바람개비의 개수
  a *= 2. ;
  float r = sin(a);
  
  vec3 col = vec3(step(r, d));

  gl_FragColor = vec4(col, 1.0);
}
