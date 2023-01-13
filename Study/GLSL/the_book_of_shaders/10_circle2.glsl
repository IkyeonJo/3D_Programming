#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

void main() {
  vec2 coord = gl_FragCoord.xy / u_resolution;
  coord.x *= u_resolution.x / u_resolution.y; // 화면 해상도 변화에 영향받지 않기 위해 설정
  coord = coord*2. -1.; // 화면의 원점을 화면의 중심으로 가져옴
  vec2 point = vec2(0.5);
  // d = length(abs(coord)-point);
  float d = distance(abs(coord), point);
  d = fract(d*10.);
  vec3 color = vec3(d); 
  // gl_FragColor = vec4(vec3(fract(d*10.)), 1.);
  gl_FragColor = vec4(color, 1.);
}
