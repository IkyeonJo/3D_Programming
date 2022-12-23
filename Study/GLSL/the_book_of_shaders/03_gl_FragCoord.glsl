#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // 캔버스 사이즈(폭, 높이)
uniform vec2 u_mouse; // 스크린 픽셀에서의 마우스 위치
uniform float u_time; // 쉐이더로딩 후 경과된 시간(초 단위)

void main() {
  // vec4 gl_FragCoord: the window relative coordinate (x, y, z, 1/w)
  // https://registry.khronos.org/OpenGL-Refpages/gl4/html/gl_FragCoord.xhtml
  // - 픽셀(=fragment)의 좌표: 좌하단이 (0,0)
  // - (uniform이 아닌) varing
  vec2 st = gl_FragCoord.xy / u_resolution; // 각 픽셀의 좌표값을 해상도로 나누어 줌으로써, 0~1 사이 값으로 normalize
  // 예: 화면 해상도가 (500,500)이라면 화면 중앙의 st 값은
  // vec2(250./500., 250./500.) 즉 vec2(0.5, 0.5) = vec2(0.5)가 될 것임
  gl_FragColor = vec4(st.x, st.y, 0., 1.); // st.x와 st.y는 0~1 사이의 값을 갖는다.
  // gl_FragColor = vec4(0., st.y, st.x, 1.);
}