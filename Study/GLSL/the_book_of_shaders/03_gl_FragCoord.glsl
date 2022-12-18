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
  // gl_FragColor = vec4(st.x, st.y, 0., 1.);
  gl_FragColor = vec4(0., st.y, st.x, 1.);
}